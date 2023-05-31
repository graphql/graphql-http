import express from 'express';
import { createHandler } from '../../lib/use/express.mjs';
import { schema } from '../schema.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port });

console.log(`Listening to port ${port}`);
