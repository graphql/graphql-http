import type { Request, Handler } from 'express';
import {
  createHandler as createRawHandler,
  HandlerOptions,
  OperationContext,
} from '../handler';

export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Request, undefined, Context>,
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
          new Promise<string>((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => resolve(body));
          });
        },
        raw: req,
        context: undefined,
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
