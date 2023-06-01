import uWS from 'uWebSockets.js';
import { createHandler } from '../../lib/use/uWebSockets.mjs';
import { schema } from '../schema.mjs';

const port = parseInt(process.env.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

uWS
  .App()
  .any('/graphql', createHandler({ schema }))
  .listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
