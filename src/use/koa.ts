import type { Middleware, ParameterizedContext, Response } from 'koa';
import type { IncomingMessage } from 'http';
import {
  createHandler as createRawHandler,
  HandlerOptions as RawHandlerOptions,
  Request as RawRequest,
  parseRequestParams as rawParseRequestParams,
  OperationContext,
} from '../handler';
import { RequestParams } from '../common';

/**
 * The context in the request for the handler.
 *
 * @category Server/koa
 */
export interface RequestContext {
  res: Response;
}

/**
 * The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.
 *
 * If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
 * on Koa's `ParameterizedContext` response and return `null`.
 *
 * If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
 * the function will throw an error and it is up to the user to handle and respond as they see fit.
 *
 * ```js
 * import Koa from 'koa'; // yarn add koa
 * import mount from 'koa-mount'; // yarn add koa-mount
 * import { parseRequestParams } from 'graphql-http/lib/use/koa';
 *
 * const app = new Koa();
 * app.use(
 *   mount('/', async (ctx) => {
 *     try {
 *       const maybeParams = await parseRequestParams(ctx);
 *       if (!maybeParams) {
 *         // not a well-formatted GraphQL over HTTP request,
 *         // parser responded and there's nothing else to do
 *         return;
 *       }
 *
 *       // well-formatted GraphQL over HTTP request,
 *       // with valid parameters
 *       ctx.response.status = 200;
 *       ctx.body = JSON.stringify(maybeParams, null, '  ');
 *     } catch (err) {
 *       // well-formatted GraphQL over HTTP request,
 *       // but with invalid parameters
 *       ctx.response.status = 400;
 *       ctx.body = err.message;
 *     }
 *   }),
 * );
 *
 * app.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/koa
 */
export async function parseRequestParams(
  ctx: ParameterizedContext,
): Promise<RequestParams | null> {
  const rawReq = toRequest(ctx);
  const paramsOrRes = await rawParseRequestParams(rawReq);
  if (!('query' in paramsOrRes)) {
    const [body, init] = paramsOrRes;
    ctx.body = body;
    ctx.response.status = init.status;
    ctx.response.message = init.statusText;
    if (init.headers) {
      for (const [name, value] of Object.entries(init.headers)) {
        ctx.response.set(name, value);
      }
    }
    return null;
  }
  return paramsOrRes;
}

/**
 * Handler options when using the koa adapter.
 *
 * @category Server/koa
 */
export type HandlerOptions<Context extends OperationContext = undefined> =
  RawHandlerOptions<IncomingMessage, RequestContext, Context>;

/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Koa framework.
 *
 * ```js
 * import Koa from 'koa'; // yarn add koa
 * import mount from 'koa-mount'; // yarn add koa-mount
 * import { createHandler } from 'graphql-http/lib/use/koa';
 * import { schema } from './my-graphql-schema';
 *
 * const app = new Koa();
 * app.use(mount('/', createHandler({ schema })));
 *
 * app.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/koa
 */
export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Context>,
): Middleware {
  const handle = createRawHandler(options);
  return async function requestListener(ctx) {
    try {
      const [body, init] = await handle({
        url: ctx.url,
        method: ctx.method,
        headers: ctx.headers,
        body: () => {
          if (ctx.body) {
            // in case koa has a body parser
            return ctx.body;
          }
          return new Promise<string>((resolve) => {
            let body = '';
            ctx.req.on('data', (chunk) => (body += chunk));
            ctx.req.on('end', () => resolve(body));
          });
        },
        raw: ctx.req,
        context: { res: ctx.response },
      });
      ctx.body = body;
      ctx.response.status = init.status;
      ctx.response.message = init.statusText;
      if (init.headers) {
        for (const [name, value] of Object.entries(init.headers)) {
          ctx.response.set(name, value);
        }
      }
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      ctx.response.status = 500;
    }
  };
}

function toRequest(
  ctx: ParameterizedContext,
): RawRequest<IncomingMessage, RequestContext> {
  return {
    url: ctx.url,
    method: ctx.method,
    headers: ctx.headers,
    body: () => {
      if (ctx.body) {
        // in case koa has a body parser
        return ctx.body as any;
      }
      return new Promise<string>((resolve) => {
        let body = '';
        ctx.req.on('data', (chunk) => (body += chunk));
        ctx.req.on('end', () => resolve(body));
      });
    },
    raw: ctx.req,
    context: { res: ctx.response },
  };
}
