import { jest } from '@jest/globals';
import { GraphQLError } from 'graphql';
import fetch from 'node-fetch';
import { Request } from '../handler';
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
  expect(res.json()).resolves.toEqual({ errors: [{ message: 'Woah!' }] });
});

it('should respond with result returned from onSubscribe', async () => {
  const onOperationFn = jest.fn(() => {
    // noop
  });
  const server = startTServer({
    onSubscribe: () => {
      return { data: { __typename: 'Query' } };
    },
    onOperation: onOperationFn,
  });

  const url = new URL(server.url);
  url.searchParams.set('query', '{ __typename }');
  const res = await fetch(url.toString());
  expect(res.status).toBe(200);
  expect(res.json()).resolves.toEqual({ data: { __typename: 'Query' } });
  expect(onOperationFn).not.toBeCalled(); // early result, operation did not happen
});

it.each(['schema', 'context', 'onSubscribe', 'onOperation'])(
  'should provide the request context to %s',
  async (option) => {
    const optionFn = jest.fn<(req: Request<unknown, unknown>) => void>();

    const context = {};
    const server = startTServer({
      changeRequest: (req) => ({
        ...req,
        context,
      }),
      [option]: optionFn,
    });

    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');
    await fetch(url.toString());

    expect(optionFn.mock.calls[0][0]?.context).toBe(context);
  },
);

it('should respond with error if execution result is iterable', async () => {
  const server = startTServer({
    // @ts-expect-error live queries for example
    execute: () => {
      return {
        [Symbol.asyncIterator]() {
          return this;
        },
      };
    },
  });

  const url = new URL(server.url);
  url.searchParams.set('query', '{ __typename }');
  const result = await fetch(url.toString());
  expect(result.json()).resolves.toEqual({
    errors: [
      {
        message: 'Subscriptions are not supported',
      },
    ],
  });
});
