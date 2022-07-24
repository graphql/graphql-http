import fetch from 'node-fetch';

import { schema } from './fixtures/simple';
import { startTServer } from './utils/tserver';

it('should work', async () => {
  const [url] = startTServer({
    schema,
  });

  const res = await fetch(url);

  const body = await res.text();

  console.log({ statusCode: res.status, statusText: res.statusText, body });
});
