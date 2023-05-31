import http from 'http';
import { schema } from '../schema.mjs';
import { createHandler } from '../../lib/use/http.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const server = http.createServer(createHandler({ schema }));

server.listen(port);

console.log(`Listening to port ${port}`);
