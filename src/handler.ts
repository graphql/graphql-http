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
  parse as graphqlParse,
  DocumentNode,
  getOperationAST as graphqlGetOperationAST,
  OperationTypeNode,
  GraphQLError,
} from 'graphql';
import { isResponse, Request, RequestParams, Response } from './common';
import {
  areGraphQLErrors,
  isAsyncIterable,
  isExecutionResult,
  isObject,
} from './utils';

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
export interface HandlerOptions<RawRequest = unknown, Context = unknown> {
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
        req: Request<RawRequest, Context>,
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
        req: Request<RawRequest, Context>,
        args: ExecutionArgs,
      ) => Promise<ExecutionContext | Response> | ExecutionContext | Response);
  /**
   * A custom GraphQL validate function allowing you to apply your
   * own validation rules.
   *
   * Will not be used when implementing a custom `onSubscribe`.
   */
  validate?: typeof graphqlValidate;
  /**
   * Is the `execute` function from GraphQL which is
   * used to execute the query and mutation operations.
   */
  execute?: typeof graphqlExecute;
  /**
   * GraphQL parse function allowing you to apply a custom parser.
   */
  parse?: typeof graphqlParse;
  /**
   * GraphQL operation AST getter used for detecting the operation type.
   */
  getOperationAST?: typeof graphqlGetOperationAST;
  /**
   * The subscribe callback executed right after processing the request
   * before proceeding with the GraphQL operation execution.
   *
   * If you return `ExecutionResult` from the callback, it will be used
   * directly for responding to the request. Useful for implementing a response
   * cache.
   *
   * If you return `ExecutionArgs` from the callback, it will be used instead of
   * trying to build one internally. In this case, you are responsible for providing
   * a ready set of arguments which will be directly plugged in the operation execution.
   *
   * You *must* validate the `ExecutionArgs` yourself if returning them.
   *
   * If you return an array of `GraphQLError` from the callback, they will be reported
   * to the client while complying with the spec.
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
    req: Request<RawRequest, Context>,
    params: RequestParams,
  ) =>
    | Promise<
        | ExecutionResult
        | ExecutionArgs
        | readonly GraphQLError[]
        | Response
        | void
      >
    | ExecutionResult
    | ExecutionArgs
    | readonly GraphQLError[]
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
    req: Request<RawRequest, Context>,
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
export type Handler<RawRequest = unknown, Context = unknown> = (
  req: Request<RawRequest, Context>,
) => Promise<Response>;

/**
 * Makes a GraphQL over HTTP Protocol compliant server handler. The handler can
 * be used with your favourite server library.
 *
 * Beware that the handler resolves only after the whole operation completes.
 *
 * Errors thrown from **any** of the provided options or callbacks (or even due to
 * library misuse or potential bugs) will reject the handler's promise. They are
 * considered internal errors and you should take care of them accordingly.
 *
 * For production environments, its recommended not to transmit the exact internal
 * error details to the client, but instead report to an error logging tool or simply
 * the console.
 *
 * Simple example usage with Node:
 *
 * ```js
 * import http from 'http';
 * import { createHandler } from 'graphql-http';
 * import { schema } from './my-graphql-schema';
 *
 * // Create the GraphQL over HTTP handler
 * const handler = createHandler({ schema });
 *
 * // Create a HTTP server using the handler on `/graphql`
 * const server = http.createServer(async (req, res) => {
 *   if (!req.url.startsWith('/graphql')) {
 *     return res.writeHead(404).end();
 *   }
 *
 *   try {
 *     const [body, init] = await handler({
 *       url: req.url,
 *       method: req.method,
 *       headers: req.headers,
 *       body: await new Promise((resolve) => {
 *         let body = '';
 *         req.on('data', (chunk) => (body += chunk));
 *         req.on('end', () => resolve(body));
 *       }),
 *       raw: req,
 *     });
 *     res.writeHead(init.status, init.statusText, init.headers).end(body);
 *   } catch (err) {
 *     // BEWARE not to transmit the exact internal error message in production environments
 *     res.writeHead(500).end(err.message);
 *   }
 * });
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server
 */
export function createHandler<RawRequest = unknown, Context = unknown>(
  options: HandlerOptions<RawRequest, Context>,
): Handler<RawRequest, Context> {
  const {
    schema,
    context,
    validate = graphqlValidate,
    execute = graphqlExecute,
    parse = graphqlParse,
    getOperationAST = graphqlGetOperationAST,
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

    const acceptedMediaType = getAcceptableMediaType(req.headers.accept);
    if (!acceptedMediaType) {
      return [
        null,
        {
          status: 406,
          statusText: 'Not Acceptable',
          headers: {
            accept:
              'application/graphql+json; charset=utf-8, application/json; charset=utf-8',
          },
        },
      ];
    }

    // TODO: should graphql-http care about content-encoding? I'd say unzipping should happen before handler is reached

    const [
      mediaType,
      charset = 'charset=utf-8', // utf-8 is assumed when not specified. this parameter is either "charset" or "boundary" (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length)
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
            const [, search] = req.url.split('?');
            const searchParams = new URLSearchParams(search);
            partParams.operationName =
              searchParams.get('operationName') ?? undefined;
            partParams.query = searchParams.get('query') ?? undefined;
            const variables = searchParams.get('variables');
            if (variables) partParams.variables = JSON.parse(variables);
            const extensions = searchParams.get('extensions');
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

      if (partParams.query == null) throw new Error('Missing query');
      if (typeof partParams.query !== 'string')
        throw new Error('Invalid query');
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
      return makeResponse(new GraphQLError(err.message), acceptedMediaType);
    }

    let args: ExecutionArgs;
    const maybeResErrsOrArgs = await onSubscribe?.(req, params);
    if (isResponse(maybeResErrsOrArgs)) return maybeResErrsOrArgs;
    else if (
      isExecutionResult(maybeResErrsOrArgs) ||
      areGraphQLErrors(maybeResErrsOrArgs)
    )
      return makeResponse(maybeResErrsOrArgs, acceptedMediaType);
    else if (maybeResErrsOrArgs) args = maybeResErrsOrArgs;
    else {
      if (!schema) throw new Error('The GraphQL schema is not provided');

      const { operationName, query, variables } = params;

      let document: DocumentNode;
      try {
        document = parse(query);
      } catch (err) {
        return makeResponse(err, acceptedMediaType);
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

      const validationErrs = validate(args.schema, args.document);
      if (validationErrs.length) {
        return makeResponse(validationErrs, acceptedMediaType);
      }
    }

    let operation: OperationTypeNode;
    try {
      const ast = getOperationAST(args.document, args.operationName);
      if (!ast) throw null;
      operation = ast.operation;
    } catch {
      return makeResponse(
        new GraphQLError('Unable to detect operation AST'),
        acceptedMediaType,
      );
    }

    if (operation === 'subscription') {
      return makeResponse(
        new GraphQLError('Subscriptions are not supported'),
        acceptedMediaType,
      );
    }

    // mutations cannot happen over GETs
    // https://graphql.github.io/graphql-over-http/draft/#sel-CALFJRPAAELBAAxwP
    if (operation === 'mutation' && method === 'GET') {
      return [
        JSON.stringify({
          errors: [new GraphQLError('Cannot perform mutations over GET')],
        }),
        {
          status: 405,
          statusText: 'Method Not Allowed',
          headers: {
            allow: 'POST',
          },
        },
      ];
    }

    if (!('contextValue' in args)) {
      const maybeResOrContext =
        typeof context === 'function' ? await context(req, args) : context;
      if (isResponse(maybeResOrContext)) return maybeResOrContext;
      args.contextValue = maybeResOrContext;
    }

    let result = await execute(args);
    const maybeResponseOrResult = await onOperation?.(req, args, result);
    if (isResponse(maybeResponseOrResult)) return maybeResponseOrResult;
    else if (maybeResponseOrResult) result = maybeResponseOrResult;

    if (isAsyncIterable(result)) {
      return makeResponse(
        new GraphQLError('Subscriptions are not supported'),
        acceptedMediaType,
      );
    }

    return makeResponse(result, acceptedMediaType);
  };
}

/**
 * Request's Media-Type that the server accepts.
 *
 * @category Server
 */
export type AcceptableMediaType =
  | 'application/graphql+json'
  | 'application/json';

/**
 * Inspects the request and detects the appropriate/acceptable Media-Type
 * looking at the `Accept` header while complying with the GraphQL over HTTP Protocol.
 *
 * @category Server
 */
export function getAcceptableMediaType(
  acceptHeader: string | null | undefined,
): AcceptableMediaType | null {
  let acceptedMediaType: AcceptableMediaType | null = null;
  const accepts = (acceptHeader || '*/*')
    .replace(/\s/g, '')
    .toLowerCase()
    .split(',');
  for (const accept of accepts) {
    // accept-charset became obsolete, shouldnt be used (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Charset)
    // TODO: handle the weight parameter "q"
    const [mediaType, ...params] = accept.split(';');
    const charset =
      params?.find((param) => param.includes('charset=')) || 'charset=utf8'; // utf-8 is assumed when not specified;

    if (mediaType === 'application/json' && charset === 'charset=utf8') {
      acceptedMediaType = 'application/json';
      break;
    }

    if (
      (mediaType === 'application/graphql+json' ||
        mediaType === 'application/*' ||
        mediaType === '*/*') &&
      charset === 'charset=utf8'
    ) {
      acceptedMediaType = 'application/graphql+json';
      break;
    }
  }
  return acceptedMediaType;
}

/**
 * Creates an appropriate GraphQL over HTTP response following the provided arguments.
 *
 * If the first argument is an `ExecutionResult`, the operation will be treated as "successful".
 *
 * If the first argument is _any_ object without the `data` field, it will be treated as an error (as per the spec)
 * and the response will be constructed with the help of `acceptedMediaType` complying with the GraphQL over HTTP Protocol.
 *
 * @category Server
 */
export function makeResponse(
  resultOrErrors:
    | Readonly<ExecutionResult>
    | Readonly<GraphQLError[]>
    | Readonly<GraphQLError>,
  acceptedMediaType: AcceptableMediaType,
): Response {
  if (!('data' in resultOrErrors)) {
    return [
      JSON.stringify({
        errors: Array.isArray(resultOrErrors)
          ? isObject(resultOrErrors)
            ? resultOrErrors
            : new GraphQLError(String(resultOrErrors))
          : [resultOrErrors],
      }),
      {
        ...(acceptedMediaType === 'application/json'
          ? {
              status: 200,
              statusText: 'OK',
            }
          : {
              status: 400,
              statusText: 'Bad Request',
            }),
        headers: {
          'content-type':
            acceptedMediaType === 'application/json'
              ? 'application/json; charset=utf-8'
              : 'application/graphql+json; charset=utf-8',
        },
      },
    ];
  }

  return [
    JSON.stringify(resultOrErrors),
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
}
