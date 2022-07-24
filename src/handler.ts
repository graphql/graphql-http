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
   */
  schema?:
    | GraphQLSchema
    | ((
        req: Request<RawRequest>,
        args: Omit<ExecutionArgs, 'schema'>,
      ) => Promise<GraphQLSchema> | GraphQLSchema);
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
   * Authenticate the request before proceeding with the GraphQL operation.
   *
   * Returning `false` will automatically respond with `401: Unauthorized`.
   *
   * If you want to respond to the client with a custom status and/or body,
   * you should do by returning a `Request` argument which will stop
   * further execution.
   */
  authenticate?: (
    req: Request<RawRequest>,
  ) =>
    | Promise<Response | boolean | undefined | void>
    | Response
    | boolean
    | undefined
    | void;
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
    authenticate,
    onSubscribe,
    onOperation,
  } = options;

  return async function handler(req) {
    const res = await authenticate?.(req);
    if (res === false) {
      return [null, { status: 401, statusText: 'Unauthorized' }];
    }
    if (isResponse(res)) {
      return res;
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
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

    const accept = req.headers.accept || '*/*';
    if (
      accept !== 'application/graphql+json' &&
      accept !== 'application/json' &&
      accept !== 'application/x-www-form-urlencoded' &&
      accept !== '*/*'
    ) {
      return [
        null,
        {
          status: 406,
          statusText: 'Not Acceptable',
          headers: {
            accept:
              'application/graphql+json, application/json, application/x-www-form-urlencoded',
          },
        },
      ];
    }

    let params;
    try {
      const partParams: Partial<RequestParams> = {};
      if (req.method === 'GET') {
        try {
          const url = new URL(req.url ?? '', 'http://localhost/');
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
      } else {
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
          throw new Error('Unparsable body');
        }
      }

      if (!partParams.query) throw new Error('Missing query');
      if (partParams.variables && typeof partParams.variables !== 'object')
        throw new Error('Invalid variables');
      if (partParams.extensions && typeof partParams.extensions !== 'object')
        throw new Error('Invalid extensions');

      // request parameters are checked and now complete
      params = partParams as RequestParams;
    } catch (err) {
      return [err.message, { status: 400, statusText: 'Bad Request' }];
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
          { status: 400, statusText: 'Bad Request' },
        ];
      }

      const argsWithoutSchema = {
        operationName,
        document,
        variableValues: variables,
      };
      args = {
        ...argsWithoutSchema,
        schema:
          typeof schema === 'function'
            ? await schema(req, argsWithoutSchema)
            : schema,
      };
    }

    let operation: OperationTypeNode;
    try {
      const ast = getOperationAST(args.document, args.operationName);
      if (!ast) throw null;
      operation = ast.operation;
    } catch {
      return [
        'Unable to detect operation AST',
        { status: 400, statusText: 'Bad Request' },
      ];
    }

    // mutations cannot happen over GETs
    // https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#get
    if (operation === 'mutation' && req.method === 'GET') {
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
          status: 400,
          statusText: 'Bad Request',
          headers: {
            'content-type':
              accept === 'application/json'
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
            accept === 'application/json'
              ? 'application/json; charset=utf-8'
              : 'application/graphql+json; charset=utf-8',
        },
      },
    ];
  };
}
