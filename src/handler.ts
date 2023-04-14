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
  ValidationRule,
  specifiedRules,
  execute as graphqlExecute,
  parse as graphqlParse,
  DocumentNode,
  getOperationAST as graphqlGetOperationAST,
  OperationTypeNode,
  GraphQLError,
} from 'graphql';
import { RequestParams } from './common';
import {
  areGraphQLErrors,
  isAsyncIterable,
  isExecutionResult,
  isGraphQLError,
  isObject,
  jsonErrorReplacer,
} from './utils';

/**
 * The incoming request headers the implementing server should provide.
 *
 * @category Server
 */
export type RequestHeaders =
  | {
      /**
       * Always an array in Node. Duplicates are added to it.
       * Not necessarily true for other environments.
       */
      'set-cookie'?: string | string[] | undefined;
      [key: string]: string | string[] | undefined;
    }
  | {
      get: (key: string) => string | null;
    };

/**
 * Server agnostic request interface containing the raw request
 * which is server dependant.
 *
 * @category Server
 */
export interface Request<Raw, Context> {
  readonly method: string;
  readonly url: string;
  readonly headers: RequestHeaders;
  /**
   * Parsed request body or a parser function.
   *
   * If the provided function throws, the error message "Unparsable JSON body" will
   * be in the erroneous response.
   */
  readonly body:
    | string
    | Record<string, unknown>
    | null
    | (() =>
        | string
        | Record<string, unknown>
        | null
        | Promise<string | Record<string, unknown> | null>);
  /**
   * The raw request itself from the implementing server.
   *
   * For example: `express.Request` when using Express, or maybe
   * `http.IncomingMessage` when just using Node with `http.createServer`.
   */
  readonly raw: Raw;
  /**
   * Context value about the incoming request, you're free to pass any information here.
   */
  readonly context: Context;
}

/**
 * The response headers that get returned from graphql-http.
 *
 * @category Server
 */
export type ResponseHeaders = {
  accept?: string;
  allow?: string;
  'content-type'?: string;
} & Record<string, string>;

/**
 * Server agnostic response body returned from `graphql-http` needing
 * to be coerced to the server implementation in use.
 *
 * @category Server
 */
export type ResponseBody = string;

/**
 * Server agnostic response options (ex. status and headers) returned from
 * `graphql-http` needing to be coerced to the server implementation in use.
 *
 * @category Server
 */
export interface ResponseInit {
  readonly status: number;
  readonly statusText: string;
  readonly headers?: ResponseHeaders;
}

/**
 * Server agnostic response returned from `graphql-http` containing the
 * body and init options needing to be coerced to the server implementation in use.
 *
 * @category Server
 */
export type Response = readonly [body: ResponseBody | null, init: ResponseInit];

/**
 * Checks whether the passed value is the `graphql-http` server agnostic response.
 *
 * @category Server
 */
export function isResponse(val: unknown): val is Response {
  // TODO: make sure the contents of init match ResponseInit
  return (
    Array.isArray(val) &&
    (typeof val[0] === 'string' || val[0] === null) &&
    isObject(val[1])
  );
}

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
export type OperationContext =
  | Record<PropertyKey, unknown>
  | symbol
  | number
  | string
  | boolean
  | undefined
  | null;

/**
 * The (GraphQL) error formatter function.
 *
 * @category Server
 */
export type FormatError = (
  err: Readonly<GraphQLError | Error>,
) => GraphQLError | Error;

/** @category Server */
export type OperationArgs<Context extends OperationContext = undefined> =
  ExecutionArgs & { contextValue?: Context };

/** @category Server */
export interface HandlerOptions<
  RequestRaw = unknown,
  RequestContext = unknown,
  Context extends OperationContext = undefined,
> {
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
        req: Request<RequestRaw, RequestContext>,
        args: Omit<OperationArgs<Context>, 'schema'>,
      ) => Promise<GraphQLSchema | Response> | GraphQLSchema | Response);
  /**
   * A value which is provided to every resolver and holds
   * important contextual information like the currently
   * logged in user, or access to a database.
   */
  context?:
    | Context
    | ((
        req: Request<RequestRaw, RequestContext>,
        params: RequestParams,
      ) => Promise<Context | Response> | Context | Response);
  /**
   * A custom GraphQL validate function allowing you to apply your
   * own validation rules.
   *
   * Will not be used when implementing a custom `onSubscribe`.
   */
  validate?: typeof graphqlValidate;
  /**
   * The validation rules for running GraphQL validate.
   *
   * When providing an array, the rules will be APPENDED to the default
   * `specifiedRules` array provided by the graphql-js module.
   *
   * Alternatively, providing a function instead will OVERWRITE the defaults
   * and use exclusively the rules returned by the function. The third (last)
   * argument of the function are the default `specifiedRules` array provided
   * by the graphql-js module, you're free to prepend/append the defaults to
   * your rule set, or omit them altogether.
   */
  validationRules?:
    | readonly ValidationRule[]
    | ((
        req: Request<RequestRaw, RequestContext>,
        args: OperationArgs<Context>,
        specifiedRules: readonly ValidationRule[],
      ) => Promise<readonly ValidationRule[]> | readonly ValidationRule[]);
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
   * The GraphQL root value or resolvers to go alongside the execution.
   * Learn more about them here: https://graphql.org/learn/execution/#root-fields-resolvers.
   *
   * If you return from `onSubscribe`, and the returned value is
   * missing the `rootValue` field, the relevant operation root
   * will be used instead.
   */
  rootValue?: unknown;
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
    req: Request<RequestRaw, RequestContext>,
    params: RequestParams,
  ) =>
    | Promise<
        | ExecutionResult
        | OperationArgs<Context>
        | readonly GraphQLError[]
        | Response
        | void
      >
    | ExecutionResult
    | OperationArgs<Context>
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
    req: Request<RequestRaw, RequestContext>,
    args: OperationArgs<Context>,
    result: ExecutionResult,
  ) =>
    | Promise<ExecutionResult | Response | void>
    | ExecutionResult
    | Response
    | void;
  /**
   * Format handled errors to your satisfaction. Either GraphQL errors
   * or safe request processing errors are meant by "handleded errors".
   *
   * If multiple errors have occured, all of them will be mapped using
   * this formatter.
   */
  formatError?: FormatError;
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
export type Handler<RequestRaw = unknown, RequestContext = unknown> = (
  req: Request<RequestRaw, RequestContext>,
) => Promise<Response>;

/**
 * Makes a GraphQL over HTTP spec compliant server handler. The handler can
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
 *       body: () => new Promise((resolve) => {
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
export function createHandler<
  RequestRaw = unknown,
  RequestContext = unknown,
  Context extends OperationContext = undefined,
>(
  options: HandlerOptions<RequestRaw, RequestContext, Context>,
): Handler<RequestRaw, RequestContext> {
  const {
    schema,
    context,
    validate = graphqlValidate,
    validationRules = [],
    execute = graphqlExecute,
    parse = graphqlParse,
    getOperationAST = graphqlGetOperationAST,
    rootValue,
    onSubscribe,
    onOperation,
    formatError = (err) => err,
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

    const acceptedMediaType = getAcceptableMediaType(getHeader(req, 'accept'));
    if (!acceptedMediaType) {
      return [
        null,
        {
          status: 406,
          statusText: 'Not Acceptable',
          headers: {
            accept:
              'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
          },
        },
      ];
    }

    // TODO: should graphql-http care about content-encoding? I'd say unzipping should happen before handler is reached

    const [
      mediaType,
      charset = 'charset=utf-8', // utf-8 is assumed when not specified. this parameter is either "charset" or "boundary" (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length)
    ] = (getHeader(req, 'content-type') || '')
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
          let data;
          try {
            const body =
              typeof req.body === 'function' ? await req.body() : req.body;
            data = typeof body === 'string' ? JSON.parse(body) : body;
          } catch (err) {
            throw new Error('Unparsable JSON body');
          }
          if (!isObject(data)) {
            throw new Error('JSON body must be an object');
          }
          partParams.operationName = data.operationName;
          partParams.query = data.query;
          partParams.variables = data.variables;
          partParams.extensions = data.extensions;
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
        partParams.operationName != null &&
        typeof partParams.operationName !== 'string'
      ) {
        throw new Error('Invalid operationName');
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
      return makeResponse(err, acceptedMediaType, formatError);
    }

    let args: OperationArgs<Context>;
    const maybeResErrsOrArgs = await onSubscribe?.(req, params);
    if (isResponse(maybeResErrsOrArgs)) return maybeResErrsOrArgs;
    else if (
      isExecutionResult(maybeResErrsOrArgs) ||
      areGraphQLErrors(maybeResErrsOrArgs)
    )
      return makeResponse(maybeResErrsOrArgs, acceptedMediaType, formatError);
    else if (maybeResErrsOrArgs) args = maybeResErrsOrArgs;
    else {
      if (!schema) throw new Error('The GraphQL schema is not provided');

      const { operationName, query, variables } = params;

      let document: DocumentNode;
      try {
        document = parse(query);
      } catch (err) {
        return makeResponse(err, acceptedMediaType, formatError);
      }

      const resOrContext =
        typeof context === 'function' ? await context(req, params) : context;
      if (isResponse(resOrContext)) return resOrContext;

      const argsWithoutSchema = {
        operationName,
        document,
        variableValues: variables,
        contextValue: resOrContext,
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

      let rules = specifiedRules;
      if (typeof validationRules === 'function') {
        rules = await validationRules(req, args, specifiedRules);
      } else {
        rules = [...rules, ...validationRules];
      }
      const validationErrs = validate(args.schema, args.document, rules);
      if (validationErrs.length) {
        return makeResponse(validationErrs, acceptedMediaType, formatError);
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
        formatError,
      );
    }

    if (operation === 'subscription') {
      return makeResponse(
        new GraphQLError('Subscriptions are not supported'),
        acceptedMediaType,
        formatError,
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

    if (!('rootValue' in args)) {
      args.rootValue = rootValue;
    }

    if (!('contextValue' in args)) {
      const resOrContext =
        typeof context === 'function' ? await context(req, params) : context;
      if (isResponse(resOrContext)) return resOrContext;
      args.contextValue = resOrContext;
    }

    let result = await execute(args);
    const maybeResponseOrResult = await onOperation?.(req, args, result);
    if (isResponse(maybeResponseOrResult)) return maybeResponseOrResult;
    else if (maybeResponseOrResult) result = maybeResponseOrResult;

    if (isAsyncIterable(result)) {
      return makeResponse(
        new GraphQLError('Subscriptions are not supported'),
        acceptedMediaType,
        formatError,
      );
    }

    return makeResponse(result, acceptedMediaType, formatError);
  };
}

/**
 * Request's Media-Type that the server accepts.
 *
 * @category Server
 */
export type AcceptableMediaType =
  | 'application/graphql-response+json'
  | 'application/json';

/**
 * Inspects the request and detects the appropriate/acceptable Media-Type
 * looking at the `Accept` header while complying with the GraphQL over HTTP spec.
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

    if (
      mediaType === 'application/graphql-response+json' &&
      charset === 'charset=utf8'
    ) {
      acceptedMediaType = 'application/graphql-response+json';
      break;
    }

    if (
      (mediaType === 'application/json' ||
        mediaType === 'application/*' ||
        mediaType === '*/*') &&
      charset === 'charset=utf8'
    ) {
      acceptedMediaType = 'application/json';
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
 * If the first argument is (an array of) `GraphQLError`, or an `ExecutionResult` without the `data` field, it will be treated
 * the response will be constructed with the help of `acceptedMediaType` complying with the GraphQL over HTTP spec.
 *
 * If the first argument is an `Error`, the operation will be treated as a bad request responding with `400: Bad Request` and the
 * error will be present in the `ExecutionResult` style.
 *
 * @category Server
 */
export function makeResponse(
  resultOrErrors:
    | Readonly<ExecutionResult>
    | Readonly<GraphQLError[]>
    | Readonly<GraphQLError>
    | Readonly<Error>,
  acceptedMediaType: AcceptableMediaType,
  formatError: FormatError,
): Response {
  if (
    resultOrErrors instanceof Error &&
    // because GraphQLError extends the Error class
    !isGraphQLError(resultOrErrors)
  ) {
    return [
      JSON.stringify(
        { errors: [formatError(resultOrErrors)] },
        jsonErrorReplacer,
      ),
      {
        status: 400,
        statusText: 'Bad Request',
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    ];
  }
  const errors = isGraphQLError(resultOrErrors)
    ? [resultOrErrors]
    : areGraphQLErrors(resultOrErrors)
    ? resultOrErrors
    : null;
  if (errors) {
    return [
      JSON.stringify({ errors: errors.map(formatError) }, jsonErrorReplacer),
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
              : 'application/graphql-response+json; charset=utf-8',
        },
      },
    ];
  }

  return [
    JSON.stringify(
      'errors' in resultOrErrors && resultOrErrors.errors
        ? {
            ...resultOrErrors,
            errors: resultOrErrors.errors.map(formatError),
          }
        : resultOrErrors,
      jsonErrorReplacer,
    ),
    {
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type':
          acceptedMediaType === 'application/json'
            ? 'application/json; charset=utf-8'
            : 'application/graphql-response+json; charset=utf-8',
      },
    },
  ];
}

function getHeader(
  req: Request<unknown, unknown>,
  key: 'set-cookie',
): string[] | null;
function getHeader(
  req: Request<unknown, unknown>,
  key: 'accept' | 'allow' | 'content-type' | string,
): string | null;
function getHeader(
  req: Request<unknown, unknown>,
  key: string,
): string | string[] | null {
  if (typeof req.headers.get === 'function') {
    return req.headers.get(key);
  }
  return Object(req.headers)[key];
}
