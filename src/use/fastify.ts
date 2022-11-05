import type { FastifyRequest, RouteHandler } from 'fastify';
import {
  createHandler as createRawHandler,
  HandlerOptions,
  OperationContext,
} from '../handler';

export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<FastifyRequest, undefined, Context>,
): RouteHandler {
  const isProd = process.env.NODE_ENV === 'production';
  const handle = createRawHandler(options);
  return async function requestListener(req, reply) {
    try {
      const [body, init] = await handle({
        url: req.url,
        method: req.method,
        headers: req.headers,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: req.body as any,
        raw: req,
        context: undefined,
      });
      reply
        .status(init.status)
        .headers(init.headers || {})
        .send(body);
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      if (isProd) {
        reply.status(500).send();
      } else {
        reply
          .status(500)
          .header('content-type', 'application/json; charset=utf-8')
          .send({
            errors: [
              err instanceof Error
                ? {
                    message: err.message,
                    stack: err.stack,
                  }
                : err,
            ],
          });
      }
    }
  };
}
