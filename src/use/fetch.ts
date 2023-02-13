import {
  createHandler as createRawHandler,
  HandlerOptions as RawHandlerOptions,
  OperationContext,
} from '../handler';

/**
 * The necessary API from the fetch environment for the handler.
 *
 * @category Server/fetch
 */
export interface FetchAPI {
  Response: typeof Response;
  ReadableStream: typeof ReadableStream;
  TextEncoder: typeof TextEncoder;
}

/**
 * Handler options when using the fetch adapter.
 *
 * @category Server/fetch
 */
export type HandlerOptions<Context extends OperationContext = undefined> =
  RawHandlerOptions<Request, FetchAPI, Context>;

/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * a fetch environment like Deno, Bun, CloudFlare Workers, Lambdas, etc.
 *
 * You can use [@whatwg-node/server](https://github.com/ardatan/whatwg-node/tree/master/packages/server) to create a server adapter and
 * isomorphically use it in _any_ environment. See an example:
 *
 * ```js
 * import http from 'http';
 * import { createServerAdapter } from '@whatwg-node/server'; // yarn add @whatwg-node/server
 * import { createHandler } from 'graphql-http/lib/use/fetch';
 * import { schema } from './my-graphql-step';
 *
 * // Use this adapter in _any_ environment.
 * const adapter = createServerAdapter({
 *   handleRequest: createHandler({ schema }),
 * });
 *
 * const server = http.createServer(adapter);
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @param reqCtx - Custom fetch API engine, will use from global scope if left undefined.
 *
 * @category Server/fetch
 */
export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Context>,
  reqCtx: Partial<FetchAPI> = {},
): (req: Request) => Promise<Response> {
  const isProd = process.env.NODE_ENV === 'production';
  const api: FetchAPI = {
    Response: reqCtx.Response || Response,
    TextEncoder: reqCtx.TextEncoder || TextEncoder,
    ReadableStream: reqCtx.ReadableStream || ReadableStream,
  };
  const handler = createRawHandler(options);
  return async function handleRequest(req) {
    try {
      const [body, init] = await handler({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: () => req.text(),
        raw: req,
        context: api,
      });
      return new api.Response(body, init);
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      if (isProd) {
        return new api.Response(null, { status: 500 });
      } else {
        return new api.Response(
          JSON.stringify({
            errors: [
              err instanceof Error
                ? {
                    message: err.message,
                    stack: err.stack,
                  }
                : err,
            ],
          }),
          {
            status: 500,
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
          },
        );
      }
    }
  };
}
