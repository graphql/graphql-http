import { vi, it, expect } from 'vitest';
import { GraphQLError } from 'graphql';
import {
  createHandler,
  Handler,
  RequestHeaders,
  Response,
} from '../src/handler';
import { RequestParams } from '../src/common';
import { schema } from './fixtures/simple';

function treq(
  handler: Handler<unknown, unknown>,
  method: 'GET',
  search: RequestParams,
  headers?: RequestHeaders,
): Promise<Response>;
function treq(
  handler: Handler<unknown, unknown>,
  method: 'POST',
  body: RequestParams,
  headers?: RequestHeaders,
): Promise<Response>;
function treq(
  handler: Handler<unknown, unknown>,
  method: 'GET' | 'POST',
  params: RequestParams,
  headers: RequestHeaders = {},
): Promise<Response> {
  const search = method === 'GET' ? new URLSearchParams() : null;
  if (params.operationName) search?.set('operationName', params.operationName);
  search?.set('query', params.query);
  if (params.variables)
    search?.set('variables', JSON.stringify(params.variables));
  if (params.extensions)
    search?.set('extensions', JSON.stringify(params.extensions));
  return handler({
    method,
    url: search ? `http://localhost?${search.toString()}` : 'http://localhost',
    headers: {
      accept: 'application/graphql-response+json',
      'content-type': search ? undefined : 'application/json',
      ...headers,
    },
    body: search ? null : JSON.stringify(params),
    raw: null,
    context: null,
  });
}

it.each(['schema', 'context', 'onSubscribe', 'onOperation'])(
  'should use the response returned from %s',
  async (option) => {
    const h = createHandler({
      schema,
      [option]: () => {
        return [null, { status: 418 }];
      },
    });

    const [body, init] = await treq(h, 'GET', { query: '{ __typename }' });

    expect(body).toBeNull();
    expect(init.status).toBe(418);
  },
);

it('should report graphql errors returned from onSubscribe', async () => {
  const h = createHandler({
    schema,
    onSubscribe: () => {
      return [new GraphQLError('Woah!')];
    },
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
  const h = createHandler({
    schema,
    onSubscribe: () => {
      return { data: { __typename: 'Query' } };
    },
    onOperation: onOperationFn,
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
    const h = createHandler({
      schema,
      [option]: optionFn,
    });

    await h({
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
  const h = createHandler({
    schema,
    execute: () => {
      return {
        [Symbol.asyncIterator]() {
          return this;
        },
      } as any;
    },
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
  const h = createHandler({ schema });

  await expect(
    treq(h, 'GET', {
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
  const h = createHandler({
    schema,
    validationRules: [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });

  await expect(treq(h, 'GET', { query: '{ idontexist }' })).resolves
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
  const h = createHandler({
    schema,
    validationRules: () => [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });

  await expect(treq(h, 'GET', { query: '{ idontexist }' })).resolves
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
  const h = createHandler({ schema });

  await expect(
    h({
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
  const h = createHandler({
    schema,
    formatError: formatErrorFn,
  });
  await expect(treq(h, 'GET', { query: '{ idontexist }' })).resolves
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
  const h = createHandler({
    schema,
    formatError: formatErrorFn,
  });
  await expect(treq(h, 'GET', { query: '{ idontexist }' })).resolves
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
  const h = createHandler({
    schema,
    parseRequestParams() {
      return {
        query: '{ hello }',
      };
    },
  });

  await expect(
    h({
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
  const h = createHandler({
    schema,
    parseRequestParams() {
      return [
        'Hello',
        { status: 200, statusText: 'OK', headers: { 'x-hi': 'there' } },
      ];
    },
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
  const h = createHandler({
    schema,
    parseRequestParams() {
      throw new Error('Wrong.');
    },
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
  const h = createHandler({
    schema,
    parseRequestParams() {
      throw new GraphQLError('Wronger.');
    },
  });

  await expect(
    treq(
      h,
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
    treq(h, 'GET', { query: '{ __typename }' }, { accept: 'application/json' }),
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
  const h = createHandler({
    schema,
    parseRequestParams() {
      return;
    },
  });

  await expect(treq(h, 'GET', { query: '{ __typename }' })).resolves
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
