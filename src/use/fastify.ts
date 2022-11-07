import type { FastifyRequest, RouteHandler } from 'fastify';
import {
  createHandler as createRawHandler,
  HandlerOptions,
  OperationContext,
} from '../handler';

/**
 * Create a GraphQL over HTTP Protocol compliant request handler for
 * the fastify framework.
 *
 * ```js
 * import Fastify from 'fastify'; // yarn add fastify
 * import { createHandler } from 'graphql-http/lib/use/express';
 * import { schema } from './my-graphql-schema';
 *
 * const fastify = Fastify();
 * fastify.all('/graphql', createHandler({ schema }));
 *
 * fastify.listen({ port: 4000 });
 * console.log('Listening to port 4000');
 * ```
 *
 * @category Server/fastify
 */
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
        // "or undefined" because `null` will be JSON stringified
        .send(body || undefined);
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
