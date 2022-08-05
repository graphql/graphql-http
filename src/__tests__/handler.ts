import { GraphQLError } from 'graphql';
import fetch from 'node-fetch';
import { startTServer } from './utils/tserver';

it.each(['schema', 'context', 'onSubscribe', 'onOperation'])(
  'should use the response returned from %s',
  async (option) => {
    const server = startTServer({
      [option]: () => {
        return [null, { status: 418 }];
      },
    });

    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');
    const res = await fetch(url.toString());
    expect(res.status).toBe(418);
  },
);

it('should report graphql errors returned from onSubscribe', async () => {
  const server = startTServer({
    onSubscribe: () => {
      return [new GraphQLError('Woah!')];
    },
  });

  const url = new URL(server.url);
  url.searchParams.set('query', '{ __typename }');
  const res = await fetch(url.toString());
  expect(res.status).toBe(400);
  expect(res.json()).resolves.toEqual({ errors: [{ message: 'Woah!' }] });
});
