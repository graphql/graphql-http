import type { HttpRequest, HttpResponse } from 'uWebSockets.js';
import {
  createHandler as createRawHandler,
  HandlerOptions as RawHandlerOptions,
  OperationContext,
} from '../handler';

/**
 * The context in the request for the handler.
 *
 * @category Server/uWebSockets
 */
export interface RequestContext {
  res: HttpResponse;
}

/**
 * Handler options when using the http adapter.
 *
 * @category Server/uWebSockets
 */
export type HandlerOptions<Context extends OperationContext = undefined> =
  RawHandlerOptions<HttpRequest, RequestContext, Context>;

/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the Node environment [uWebSockets.js module](https://github.com/uNetworking/uWebSockets.js/).
 *
 * ```js
 * import uWS from 'uWebSockets.js'; // yarn add uWebSockets.js@uNetworking/uWebSockets.js#<version>
 * import { createHandler } from 'graphql-http/lib/use/uWebSockets';
 * import { schema } from './my-graphql-step';
 *
 * uWS
 *   .App()
 *   .any('/graphql', createHandler({ schema }))
 *   .listen(4000, () => {
 *     console.log('Listening to port 4000');
 *   });
 * ```
 *
 * @category Server/uWebSockets
 */
export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Context>,
): (res: HttpResponse, req: HttpRequest) => Promise<void> {
  const handle = createRawHandler(options);
  return async function requestListener(res, req) {
    try {
      const [body, init] = await handle({
        url: req.getUrl(),
        method: req.getMethod(),
        headers: { get: req.getHeader },
        body: () =>
          new Promise<string>((resolve) => {
            let body = '';
            res.onData((chunk, isLast) => {
              body += chunk;
              if (isLast) {
                resolve(body);
              }
            });
          }),
        raw: req,
        context: { res },
      });

      res.writeStatus(`${init.status} ${init.statusText}`);
      for (const [key, val] of Object.entries(init.headers || {})) {
        res.writeHeader(key, val);
      }
      if (body) {
        res.end(body);
      }
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      res.writeStatus('500 Internal Server Error').endWithoutBody();
    }
  };
}
