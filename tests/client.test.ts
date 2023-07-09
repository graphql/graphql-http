import { it, expect } from 'vitest';
import { createTHandler } from './thandler';
import { RequestHeaders } from '../src/handler';
import { createClient, NetworkError } from '../src/client';
import { ExecutionResult } from 'graphql';
import { RequestParams } from '../src/common';
import { Client } from '../src/client';

function texecute<D = unknown, E = unknown>(
  client: Client,
  params: RequestParams,
): [request: Promise<ExecutionResult<D, E>>, cancel: () => void] {
  let cancel!: () => void;
  const request = new Promise<ExecutionResult<D, E>>((resolve, reject) => {
    let result: ExecutionResult<D, E>;
    cancel = client.subscribe<D, E>(params, {
      next: (data) => (result = data),
      error: reject,
      complete: () => resolve(result),
    });
  });
  return [request, cancel];
}

it('should use the provided headers', async () => {
  let headers: RequestHeaders = {};
  const { fetch } = createTHandler({
    onSubscribe: (req) => {
      headers = req.headers;
    },
  });

  const client = createClient({
    url: 'http://localhost',
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
  const { fetch } = createTHandler();

  const client = createClient({
    url: 'http://localhost',
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: '{ hello }' });

  const result = await request;

  expect(result).toEqual({ data: { hello: 'world' } });
});

it('should execute mutation, next the result and then complete', async () => {
  const { fetch } = createTHandler();

  const client = createClient({
    url: 'http://localhost',
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: 'mutation { dontChange }' });

  const result = await request;

  expect(result).toEqual({ data: { dontChange: 'didntChange' } });
});

it('should report invalid request', async () => {
  const { fetch } = createTHandler();

  const client = createClient({
    url: 'http://localhost',
    fetchFn: fetch,
  });

  const [request] = texecute(client, { query: 'query {' });

  await expect(request).rejects.toBeInstanceOf(NetworkError);
});
