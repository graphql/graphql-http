import express from 'express';
import { createHandler } from '../../src/use/express';
import { schema } from '../schema';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port });

console.log(`Listening to port ${port}`);
