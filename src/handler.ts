/**
 *
 * handler
 *
 */

import {
  ExecutionArgs,
  ExecutionResult,
  getOperationAST,
  GraphQLSchema,
  OperationTypeNode,
  parse,
  validate as graphqlValidate,
  execute as graphqlExecute,
} from 'graphql';
import { Request, RequestParams, Response } from './common';

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
   * subscription request allowing you to manipulate schema
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
   *
   * Note that the context function is invoked on each operation only once.
   * Meaning, for subscriptions, only at the point of initialising the subscription;
   * not on every subscription event emission. Read more about the context lifecycle
   * in subscriptions here: https://github.com/graphql/graphql-js/issues/894.
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
   * TODO
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
   * Executed after the operation call resolves. For streaming
   * operations, triggering this callback does not necessarely
   * mean that there is already a result available - it means
   * that the subscription process for the stream has resolved
   * and that the client is now subscribed.
   *
   * The `OperationResult` argument is the result of operation
   * execution. It can be an iterator or already a value.
   *
   * Use this callback to listen for GraphQL operations and
   * execution result manipulation.
   *
   * If you want to respond to the client with a custom status or body,
   * you should do so using the provided `res` argument which will stop
   * further execution.
   *
   * First argument, the request, is always the GraphQL operation
   * request.
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
  /**
   * The complete callback is executed after the operation
   * has completed and the client has been notified.
   *
   * Since the library makes sure to complete streaming
   * operations even after an abrupt closure, this callback
   * will always be called.
   *
   * First argument, the request, is always the GraphQL operation
   * request.
   */
  onComplete?: (
    req: Request<RawRequest>,
    args: ExecutionArgs,
  ) => Promise<void> | void;
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
  // const {
  //   schema,
  //   context,
  //   validate = graphqlValidate,
  //   execute = graphqlExecute,
  //   subscribe = graphqlSubscribe,
  //   authenticate = function extractOrCreateStreamToken(req) {
  //     const headerToken =
  //       req.headers[TOKEN_HEADER_KEY] || req.headers['x-graphql-stream-token']; // @deprecated >v1.0.0
  //     if (headerToken)
  //       return Array.isArray(headerToken) ? headerToken.join('') : headerToken;

  //     const urlToken = new URL(
  //       req.url ?? '',
  //       'http://localhost/',
  //     ).searchParams.get(TOKEN_QUERY_KEY);
  //     if (urlToken) return urlToken;

  //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //       const r = (Math.random() * 16) | 0,
  //         v = c == 'x' ? r : (r & 0x3) | 0x8;
  //       return v.toString(16);
  //     });
  //   },
  //   onConnecting,
  //   onConnected,
  //   onSubscribe,
  //   onOperation,
  //   onNext,
  //   onComplete,
  //   onDisconnect,
  // } = options;

  return async function handler(req) {
    const params = parseReq(req);

    const body = JSON.stringify(params);

    return [body, { status: 200, ContentType: 'application/json' }];
  };
}

function parseReq(req: Request<unknown>): RequestParams {
  const params: Partial<RequestParams> = {};

  if (req.method === 'GET') {
    try {
      const url = new URL(req.url ?? '', 'http://localhost/');
      params.operationName = url.searchParams.get('operationName') ?? undefined;
      params.query = url.searchParams.get('query') ?? undefined;
      const variables = url.searchParams.get('variables');
      if (variables) params.variables = JSON.parse(variables);
      const extensions = url.searchParams.get('extensions');
      if (extensions) params.extensions = JSON.parse(extensions);
    } catch {
      throw new Error('Unparsable URL');
    }
  } else if (req.method === 'POST') {
    if (!req.body) {
      throw new Error('Missing body');
    }
    try {
      const data = JSON.parse(req.body);
      params.operationName = data.operationName;
      params.query = data.query;
      params.variables = data.variables;
      params.extensions = data.extensions;
    } catch {
      throw new Error('Unparsable body');
    }
  } else {
    throw new Error(`Unsupported method ${req.method}`);
  }

  if (!params.query) throw new Error('Missing query');
  if (params.variables && typeof params.variables !== 'object')
    throw new Error('Invalid variables');
  if (params.extensions && typeof params.extensions !== 'object')
    throw new Error('Invalid extensions');

  return params as RequestParams;
}
