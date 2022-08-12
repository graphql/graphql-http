import fetch from 'node-fetch';
import { RequestHeaders } from '../handler';
import { createClient, NetworkError } from '../client';
import { startTServer } from './utils/tserver';
import { texecute } from './utils/texecute';

it('should use the provided headers', async () => {
  let headers: RequestHeaders = {};
  const server = startTServer({
    onSubscribe: (req) => {
      headers = req.headers;
    },
  });

  const client = createClient({
    url: server.url,
    fetchFn: fetch,
    headers: async () => {
      return { 'x-some': 'header' };
    },
  });

  const [request] = texecute(client, { query: '{ hello }' });
  await request;

  expect(headers['x-some']).toBe('header');
});

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

it('should report invalid request', async () => {
  const server = startTServer();

  const client = createClient({
    url: server.url,
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: 'query {' });

  await expect(request).rejects.toBeInstanceOf(NetworkError);
});
