import Fastify from 'fastify';
import { createHandler } from '../../lib/use/fastify.mjs';
import { schema } from '../schema.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const fastify = Fastify();
fastify.all('/graphql', createHandler({ schema }));

fastify.listen({ port });

console.log(`Listening to port ${port}`);
