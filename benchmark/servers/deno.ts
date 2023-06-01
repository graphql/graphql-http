// @ts-expect-error this is deno
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createHandler } from '../../lib/use/fetch.mjs';
import { schema } from '../schema.mjs';

const port = parseInt(
  // @ts-expect-error this is deno
  Deno.env.get('PORT'),
);
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

const handler = createHandler({ schema });

// @ts-expect-error this is deno
await serve(
  (req: Request) => {
    const [path, _search] = req.url.split('?');
    if (path.endsWith('/graphql')) {
      return handler(req);
    } else {
      return new Response(null, { status: 404 });
    }
  },
  {
    port, // Listening to port ${port}
  },
);
