import Fastify from 'fastify';
import { createHandler } from '../../src/use/fastify';
import { schema } from '../schema';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const fastify = Fastify();
fastify.all('/graphql', createHandler({ schema }));

fastify.listen({ port });

console.log(`Listening to port ${port}`);
