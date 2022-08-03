/**
 *
 * handler
 *
 */

import {
  ExecutionArgs,
  ExecutionResult,
  GraphQLSchema,
  validate as graphqlValidate,
  execute as graphqlExecute,
  parse,
  DocumentNode,
  getOperationAST,
  OperationTypeNode,
} from 'graphql';
import { isResponse, Request, RequestParams, Response } from './common';

/**
 * A concrete GraphQL execution context value type.
 *
 * Mainly used because TypeScript collapes unions
 * with `any` or `unknown` to `any` or `unknown`. So,
 * we use a custom type to allow definitions such as
 * the `context` server option.
 *
 * @category Server
 */
export type ExecutionContext =
  // eslint-disable-next-line @typescript-eslint/ban-types
  | object // you can literally pass "any" JS object as the context value
  | symbol
  | number
  | string
  | boolean
  | undefined
  | null;

/** @category Server */
export interface HandlerOptions<RawRequest = unknown> {
  /**
   * The GraphQL schema on which the operations will
   * be executed and validated against.
   *
   * If a function is provided, it will be called on every
   * operation request allowing you to manipulate schema
   * dynamically.
   *
   * If the schema is left undefined, you're trusted to
   * provide one in the returned `ExecutionArgs` from the
   * `onSubscribe` callback.
   *
   * If you want to respond to the client with a custom status and/or body,
   * you should do by returning a `Request` argument which will stop
   * further execution.
   */
  schema?:
    | GraphQLSchema
    | ((
        req: Request<RawRequest>,
        args: Omit<ExecutionArgs, 'schema'>,
      ) => Promise<GraphQLSchema | Response> | GraphQLSchema | Response);
  /**
   * A value which is provided to every resolver and holds
   * important contextual information like the currently
   * logged in user, or access to a database.
   */
  context?:
    | ExecutionContext
    | ((
        req: Request<RawRequest>,
        args: ExecutionArgs,
      ) => Promise<ExecutionContext | Response> | ExecutionContext | Response);
  /**
   * A custom GraphQL validate function allowing you to apply your
   * own validation rules.
   */
  validate?: typeof graphqlValidate;
  /**
   * Is the `execute` function from GraphQL which is
   * used to execute the query and mutation operations.
   */
  execute?: typeof graphqlExecute;
  /**
   * The subscribe callback executed right after processing the request
   * before proceeding with the GraphQL operation execution.
   *
   * If you return `ExecutionArgs` from the callback, it will be used instead of
   * trying to build one internally. In this case, you are responsible for providing
   * a ready set of arguments which will be directly plugged in the operation execution.
   *
   * Omitting the fields `contextValue` from the returned `ExecutionArgs` will use the
   * provided `context` option, if available.
   *
   * Useful for preparing the execution arguments following a custom logic. A typical
   * use-case is persisted queries. You can identify the query from the request parameters
   * and supply the appropriate GraphQL operation execution arguments.
   *
   * If you want to respond to the client with a custom status and/or body,
   * you should do by returning a `Request` argument which will stop
   * further execution.
   */
  onSubscribe?: (
    req: Request<RawRequest>,
    params: RequestParams,
  ) =>
    | Promise<ExecutionArgs | Response | void>
    | ExecutionArgs
    | Response
    | void;
  /**
   * Executed after the operation call resolves.
   *
   * The `OperationResult` argument is the result of operation
   * execution. It can be an iterator or already a value.
   *
   * Use this callback to listen for GraphQL operations and
   * execution result manipulation.
   *
   * If you want to respond to the client with a custom status and/or body,
   * you should do by returning a `Request` argument which will stop
   * further execution.
   */
  onOperation?: (
    req: Request<RawRequest>,
    args: ExecutionArgs,
    result: ExecutionResult,
  ) =>
    | Promise<ExecutionResult | Response | void>
    | ExecutionResult
    | Response
    | void;
}

/**
 * The ready-to-use handler. Simply plug it in your favourite HTTP framework
 * and enjoy.
 *
 * Errors thrown from **any** of the provided options or callbacks (or even due to
 * library misuse or potential bugs) will reject the handler's promise. They are
 * considered internal errors and you should take care of them accordingly.
 *
 * @category Server
 */
export type Handler<RawRequest = unknown> = (
  req: Request<RawRequest>,
) => Promise<Response>;

/**
 * Makes a Protocol complient HTTP GraphQL server  handler. The handler can
 * be used with your favourite server library.
 *
 * Read more about the Protocol in the PROTOCOL.md documentation file.
 *
 * @category Server
 */
export function createHandler<RawRequest = unknown>(
  options: HandlerOptions<RawRequest>,
): Handler<RawRequest> {
  const {
    schema,
    context,
    validate = graphqlValidate,
    execute = graphqlExecute,
    onSubscribe,
    onOperation,
  } = options;

  return async function handler(req) {
    const method = req.method;
    if (method !== 'GET' && method !== 'POST') {
      return [
        null,
        {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: {
            allow: 'GET, POST',
          },
        },
      ];
    }

    let acceptedMediaType:
      | 'application/graphql+json'
      | 'application/json'
      | undefined;
    const accepts = (req.headers.accept || '*/*')
      .replace(/\s/g, '')
      .toLowerCase()
      .split(',');
    for (const accept of accepts) {
      // charset in accept header's media-types is not officially specified (https://datatracker.ietf.org/doc/html/rfc7231#section-5.3.2)
      // accept-charset became obsolete, shouldnt be used (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Charset)
      // TODO: handle the weight parameter "q"
      const [mediaType] = accept.split(';');

      if (mediaType === 'application/json') {
        acceptedMediaType = 'application/json';
        break;
      }

      if (
        mediaType === 'application/graphql+json' ||
        mediaType === 'application/*' ||
        mediaType === '*/*'
      ) {
        acceptedMediaType = 'application/graphql+json';
        break;
      }
    }
    if (!acceptedMediaType) {
      return [
        null,
        {
          status: 406,
          statusText: 'Not Acceptable',
          headers: {
            accept: 'application/graphql+json, application/json',
          },
        },
      ];
    }

    // TODO: should graphql-http care about content-encoding? I'd say unzipping should happen before handler is reached

    const [
      mediaType,
      charset = 'charset=utf-8', // utf-8 is assumed when not specified
    ] = (req.headers['content-type'] || '')
      .replace(/\s/g, '')
      .toLowerCase()
      .split(';');

    let params;
    try {
      const partParams: Partial<RequestParams> = {};
      switch (true) {
        case method === 'GET': {
          // TODO: what if content-type is specified and is not application/x-www-form-urlencoded?
          try {
            const url = new URL(req.url || '', 'http://localhost/');
            partParams.operationName =
              url.searchParams.get('operationName') ?? undefined;
            partParams.query = url.searchParams.get('query') ?? undefined;
            const variables = url.searchParams.get('variables');
            if (variables) partParams.variables = JSON.parse(variables);
            const extensions = url.searchParams.get('extensions');
            if (extensions) partParams.extensions = JSON.parse(extensions);
          } catch {
            throw new Error('Unparsable URL');
          }
          break;
        }
        case method === 'POST' &&
          mediaType === 'application/json' &&
          charset === 'charset=utf-8': {
          if (!req.body) {
            throw new Error('Missing body');
          }
          try {
            const data =
              typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            partParams.operationName = data.operationName;
            partParams.query = data.query;
            partParams.variables = data.variables;
            partParams.extensions = data.extensions;
          } catch {
            throw new Error('Unparsable JSON body');
          }
          break;
        }
        default: // graphql-http doesnt support any other content type
          return [
            null,
            {
              status: 415,
              statusText: 'Unsupported Media Type',
            },
          ];
      }

      if (!partParams.query) throw new Error('Missing query');
      if (
        partParams.variables != null &&
        (typeof partParams.variables !== 'object' ||
          Array.isArray(partParams.variables))
      ) {
        throw new Error('Invalid variables');
      }
      if (
        partParams.extensions != null &&
        (typeof partParams.extensions !== 'object' ||
          Array.isArray(partParams.extensions))
      ) {
        throw new Error('Invalid extensions');
      }

      // request parameters are checked and now complete
      params = partParams as RequestParams;
    } catch (err) {
      return [
        err.message,
        {
          status: acceptedMediaType === 'application/json' ? 200 : 400,
          statusText: 'Bad Request',
        },
      ];
    }

    let args: ExecutionArgs;
    const maybeResOrExecArgs = await onSubscribe?.(req, params);
    if (isResponse(maybeResOrExecArgs)) return maybeResOrExecArgs;
    else if (maybeResOrExecArgs) args = maybeResOrExecArgs;
    else {
      if (!schema) throw new Error('The GraphQL schema is not provided');

      const { operationName, query, variables } = params;

      let document: DocumentNode;
      try {
        document = parse(query);
      } catch {
        return [
          'GraphQL query syntax error',
          {
            status: acceptedMediaType === 'application/json' ? 200 : 400,
            statusText: 'Bad Request',
          },
        ];
      }

      const argsWithoutSchema = {
        operationName,
        document,
        variableValues: variables,
      };

      if (typeof schema === 'function') {
        const resOrSchema = await schema(req, argsWithoutSchema);
        if (isResponse(resOrSchema)) return resOrSchema;
        args = {
          ...argsWithoutSchema,
          schema: resOrSchema,
        };
      } else {
        args = {
          ...argsWithoutSchema,
          schema,
        };
      }
    }

    let operation: OperationTypeNode;
    try {
      const ast = getOperationAST(args.document, args.operationName);
      if (!ast) throw null;
      operation = ast.operation;
    } catch {
      return [
        'Unable to detect operation AST',
        {
          status: acceptedMediaType === 'application/json' ? 200 : 400,
          statusText: 'Bad Request',
        },
      ];
    }

    // mutations cannot happen over GETs
    // https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#get
    if (operation === 'mutation' && method === 'GET') {
      return [
        'Cannot perform mutations over GET',
        {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: {
            allow: 'POST',
          },
        },
      ];
    }

    // TODO: what happens if operation is 'subscription'

    if (!('contextValue' in args)) {
      args.contextValue =
        typeof context === 'function' ? await context(req, args) : context;
    }

    const validationErrs = validate(args.schema, args.document);
    if (validationErrs.length) {
      return [
        JSON.stringify({ errors: validationErrs }),
        {
          status: acceptedMediaType === 'application/json' ? 200 : 400,
          statusText: 'Bad Request',
          headers: {
            'content-type':
              acceptedMediaType === 'application/json'
                ? 'application/json; charset=utf-8'
                : 'application/graphql+json; charset=utf-8',
          },
        },
      ];
    }

    let result = await execute(args);
    const maybeResOrResult = await onOperation?.(req, args, result);
    if (isResponse(maybeResOrResult)) return maybeResOrResult;
    else if (maybeResOrResult) result = maybeResOrResult;

    return [
      JSON.stringify(result),
      {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type':
            acceptedMediaType === 'application/json'
              ? 'application/json; charset=utf-8'
              : 'application/graphql+json; charset=utf-8',
        },
      },
    ];
  };
}
