import type { Request, Response, Handler } from 'express';
import {
  createHandler as createRawHandler,
  HandlerOptions as RawHandlerOptions,
  OperationContext,
} from '../handler';

/**
 * The context in the request for the handler.
 *
 * @category Server/express
 */
export interface RequestContext {
  res: Response;
}

/**
 * Handler options when using the express adapter.
 *
 * @category Server/express
 */
export type HandlerOptions<Context extends OperationContext = undefined> =
  RawHandlerOptions<Request, RequestContext, Context>;

/**
 * Create a GraphQL over HTTP spec compliant request handler for
 * the express framework.
 *
 * ```js
 * import express from 'express'; // yarn add express
 * import { createHandler } from 'graphql-http/lib/use/express';
 * import { schema } from './my-graphql-schema';
 *
 * const app = express();
 * app.all('/graphql', createHandler({ schema }));
 *
 * app.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/express
 */
export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Context>,
): Handler {
  const isProd = process.env.NODE_ENV === 'production';
  const handle = createRawHandler(options);
  return async function requestListener(req, res) {
    try {
      const [body, init] = await handle({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: () => {
          if (req.body) {
            // in case express has a body parser
            return req.body;
          }
          return new Promise<string>((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => resolve(body));
          });
        },
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
