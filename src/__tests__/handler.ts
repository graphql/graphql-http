import fetch from 'node-fetch';
import { startTServer } from './utils/tserver';

it('should use the response returned from context', async () => {
  const server = startTServer({
    context: () => {
      return [null, { status: 418 }];
    },
  });

  const url = new URL(server.url);
  url.searchParams.set('query', '{ __typename }');
  const res = await fetch(url.toString());
  expect(res.status).toBe(418);
});
