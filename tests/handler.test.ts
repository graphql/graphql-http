import { vi, it, expect } from 'vitest';
import { GraphQLError } from 'graphql';
import { createTHandler } from './thandler';
import { schema } from './fixtures/simple';

it.each(['schema', 'context', 'onSubscribe', 'onOperation'])(
  'should use the response returned from %s',
  async (option) => {
    const { request } = createTHandler({
      [option]: () => {
        return [null, { status: 418 }];
      },
    });

    const [body, init] = await request('GET', { query: '{ __typename }' });

    expect(body).toBeNull();
    expect(init.status).toBe(418);
  },
);

it('should report graphql errors returned from onSubscribe', async () => {
  const { request } = createTHandler({
    onSubscribe: () => {
      return [new GraphQLError('Woah!')];
    },
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Woah!\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should respond with result returned from onSubscribe', async () => {
  const onOperationFn = vi.fn();
  const { request } = createTHandler({
    onSubscribe: () => {
      return { data: { __typename: 'Query' } };
    },
    onOperation: onOperationFn,
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"data\\":{\\"__typename\\":\\"Query\\"}}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
  expect(onOperationFn).not.toBeCalled(); // early result, operation did not happen
});

it.each(['schema', 'context', 'onSubscribe', 'onOperation'])(
  'should provide the request context to %s',
  async (option) => {
    const optionFn = vi.fn();

    const context = {};
    const { handler } = createTHandler({
      [option]: optionFn,
    });

    await handler({
      method: 'GET',
      url:
        'http://localhost?' +
        new URLSearchParams({ query: '{ __typename }' }).toString(),
      headers: {},
      body: null,
      raw: null,
      context,
    }).catch(() => {
      // schema option breaks, but we don't care
    });

    expect(optionFn.mock.lastCall?.[0].context).toBe(context);
  },
);

it('should respond with error if execution result is iterable', async () => {
  const { request } = createTHandler({
    execute: () => {
      return {
        [Symbol.asyncIterator]() {
          return this;
        },
      } as any;
    },
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Subscriptions are not supported\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should correctly serialise execution result errors', async () => {
  const { request } = createTHandler({ schema });

  await expect(
    request('GET', {
      query: 'query ($num: Int) { num(num: $num) }',
      variables: { num: 'foo' },
    }),
  ).resolves.toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Variable \\\\\\"$num\\\\\\" got invalid value \\\\\\"foo\\\\\\"; Int cannot represent non-integer value: \\\\\\"foo\\\\\\"\\",\\"locations\\":[{\\"line\\":1,\\"column\\":8}]}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
});

it('should append the provided validation rules array', async () => {
  const { request } = createTHandler({
    validationRules: [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });

  await expect(request('GET', { query: '{ idontexist }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Woah!\\"},{\\"message\\":\\"Cannot query field \\\\\\"idontexist\\\\\\" on type \\\\\\"Query\\\\\\".\\",\\"locations\\":[{\\"line\\":1,\\"column\\":3}]}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should replace the validation rules when providing a function', async () => {
  const { request } = createTHandler({
    validationRules: () => [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });

  await expect(request('GET', { query: '{ idontexist }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Woah!\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should print plain errors in detail', async () => {
  const { handler } = createTHandler({ schema });

  await expect(
    handler({
      method: 'POST',
      url: 'http://localhost',
      headers: { 'content-type': 'application/json' },
      body: null, // missing body
      raw: null,
      context: null,
    }),
  ).resolves.toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Missing body\\"}]}",
      {
        "headers": {
          "content-type": "application/json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should format errors using the formatter', async () => {
  const formatErrorFn = vi.fn((_err) => new Error('Formatted'));
  const { request } = createTHandler({
    formatError: formatErrorFn,
  });
  await expect(request('GET', { query: '{ idontexist }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Formatted\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
  expect(formatErrorFn).toBeCalledTimes(1);
  expect(formatErrorFn.mock.lastCall?.[0]).toMatchInlineSnapshot(
    `[GraphQLError: Cannot query field "idontexist" on type "Query".]`,
  );
});

it('should respect plain errors toJSON implementation', async () => {
  class MyError extends Error {
    constructor(msg: string) {
      super(msg);
    }
    toJSON() {
      return {
        message: this.message,
        toJSON: 'used',
      };
    }
  }
  const formatErrorFn = vi.fn((_err) => new MyError('Custom toJSON'));
  const { request } = createTHandler({
    formatError: formatErrorFn,
  });
  await expect(request('GET', { query: '{ idontexist }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Custom toJSON\\",\\"toJSON\\":\\"used\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should use the custom request params parser', async () => {
  const { handler } = createTHandler({
    parseRequestParams() {
      return {
        query: '{ hello }',
      };
    },
  });

  await expect(
    handler({
      // different methods and content-types are not disallowed by the spec
      method: 'PUT',
      url: 'http://localhost',
      headers: { 'content-type': 'application/lol' },
      body: null,
      raw: null,
      context: null,
    }),
  ).resolves.toMatchInlineSnapshot(`
    [
      "{\\"data\\":{\\"hello\\":\\"world\\"}}",
      {
        "headers": {
          "content-type": "application/json; charset=utf-8",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
});

it('should use the response returned from the custom request params parser', async () => {
  const { request } = createTHandler({
    parseRequestParams() {
      return [
        'Hello',
        { status: 200, statusText: 'OK', headers: { 'x-hi': 'there' } },
      ];
    },
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "Hello",
      {
        "headers": {
          "x-hi": "there",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
});

it('should report thrown Error from custom request params parser', async () => {
  const { request } = createTHandler({
    parseRequestParams() {
      throw new Error('Wrong.');
    },
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Wrong.\\"}]}",
      {
        "headers": {
          "content-type": "application/json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);
});

it('should report thrown GraphQLError from custom request params parser', async () => {
  const { request } = createTHandler({
    parseRequestParams() {
      throw new GraphQLError('Wronger.');
    },
  });

  await expect(
    request(
      'GET',
      { query: '{ __typename }' },
      { accept: 'application/graphql-response+json' },
    ),
  ).resolves.toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Wronger.\\"}]}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 400,
        "statusText": "Bad Request",
      },
    ]
  `);

  await expect(
    request('GET', { query: '{ __typename }' }, { accept: 'application/json' }),
  ).resolves.toMatchInlineSnapshot(`
    [
      "{\\"errors\\":[{\\"message\\":\\"Wronger.\\"}]}",
      {
        "headers": {
          "content-type": "application/json; charset=utf-8",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
});

it('should use the default if nothing is returned from the custom request params parser', async () => {
  const { request } = createTHandler({
    parseRequestParams() {
      return;
    },
  });

  await expect(request('GET', { query: '{ __typename }' })).resolves
    .toMatchInlineSnapshot(`
    [
      "{\\"data\\":{\\"__typename\\":\\"Query\\"}}",
      {
        "headers": {
          "content-type": "application/graphql-response+json; charset=utf-8",
        },
        "status": 200,
        "statusText": "OK",
      },
    ]
  `);
});
