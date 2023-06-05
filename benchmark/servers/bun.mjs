import { createHandler } from '../../lib/use/fetch.mjs';
import { schema } from '../schema.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const handler = createHandler({ schema });

export default {
  port,
  /** @param {Request} req */
  fetch(req) {
    const [path, _search] = req.url.split('?');
    if (path.endsWith('/graphql')) {
      return handler(req);
    } else {
      return new Response(null, { status: 404 });
    }
  },
};

console.log(`Listening to port ${port}`);
