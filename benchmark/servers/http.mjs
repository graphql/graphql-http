import http from 'http';
import { schema } from '../schema.mjs';
import { createHandler } from '../../lib/use/http.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const handler = createHandler({ schema });
const server = http.createServer((req, res) => {
  if ((req.url || '').startsWith('/graphql')) {
    handler(req, res);
  } else {
    res.writeHead(404).end();
  }
});

server.listen(port);

console.log(`Listening to port ${port}`);
