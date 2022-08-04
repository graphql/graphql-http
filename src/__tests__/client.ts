import fetch from 'node-fetch';
import { createClient } from '../client';
import { startTServer } from './utils/tserver';
import { texecute } from './utils/texecute';

it('should execute query, next the result and then complete', async () => {
  const server = startTServer();

  const client = createClient({
    url: server.url,
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: '{ hello }' });

  const result = await request;

  expect(result).toEqual({ data: { hello: 'world' } });
});

it('should execute mutation, next the result and then complete', async () => {
  const server = startTServer();

  const client = createClient({
    url: server.url,
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: 'mutation { dontChange }' });

  const result = await request;

  expect(result).toEqual({ data: { dontChange: 'didntChange' } });
});
