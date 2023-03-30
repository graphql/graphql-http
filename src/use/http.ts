import type { IncomingMessage, ServerResponse } from 'http';
import {
  createHandler as createRawHandler,
  HandlerOptions as RawHandlerOptions,
  OperationContext,
} from '../handler';

/**
 * The context in the request for the handler.
 *
 * @category Server/http
 */
export interface RequestContext {
  res: ServerResponse;
}

/**
 * Handler options when using the http adapter.
 *
 * @category Server/http
 */
export type HandlerOptions<Context extends OperationContext = undefined> =
  RawHandlerOptions<IncomingMessage, RequestContext, Context>;

/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Node environment http module.
 *
 * ```js
 * import http from 'http';
 * import { createHandler } from 'graphql-http/lib/use/http';
 * import { schema } from './my-graphql-step';
 *
 * const server = http.createServer(createHandler({ schema }));
 *
 * server.listen(4000);
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/http
 */
export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Context>,
): (req: IncomingMessage, res: ServerResponse) => Promise<void> {
  const isProd = process.env.NODE_ENV === 'production';
  const handle = createRawHandler(options);
  return async function requestListener(req, res) {
    try {
      if (!req.url) {
        throw new Error('Missing request URL');
      }
      if (!req.method) {
        throw new Error('Missing request method');
      }
      const [body, init] = await handle({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: () =>
          new Promise<string>((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => resolve(body));
          }),
        raw: req,
        context: { res },
      });
      res.writeHead(init.status, init.statusText, init.headers).end(body);
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      if (isProd) {
        res.writeHead(500).end();
      } else {
        res
          .writeHead(500, { 'content-type': 'application/json; charset=utf-8' })
          .end(
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
          );
      }
    }
  };
}
