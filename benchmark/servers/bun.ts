import { createHandler } from '../../src/use/fetch';
import { schema } from '../schema';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const handler = createHandler({ schema });

export default {
  port,
  fetch(req: Request) {
    const [path, _search] = req.url.split('?');
    if (path.endsWith('/graphql')) {
      return handler(req);
    } else {
      return new Response(null, { status: 404 });
    }
  },
};

console.log(`Listening to port ${port}`);
