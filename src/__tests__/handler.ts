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

it('should correctly serialise execution result errors', async () => {
  const server = startTServer();
  const url = new URL(server.url);
  url.searchParams.set('query', 'query ($num: Int) { num(num: $num) }');
  url.searchParams.set('variables', JSON.stringify({ num: 'foo' }));
  const result = await fetch(url.toString());
  expect(result.json()).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "locations": [
            {
              "column": 8,
              "line": 1,
            },
          ],
          "message": "Variable "$num" got invalid value "foo"; Int cannot represent non-integer value: "foo"",
        },
      ],
    }
  `);
});

it('should append the provided validation rules array', async () => {
  const server = startTServer({
    validationRules: [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });
  const url = new URL(server.url);
  url.searchParams.set('query', '{ idontexist }');
  const result = await fetch(url.toString());
  await expect(result.json()).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Woah!",
        },
        {
          "locations": [
            {
              "column": 3,
              "line": 1,
            },
          ],
          "message": "Cannot query field "idontexist" on type "Query".",
        },
      ],
    }
  `);
});

it('should replace the validation rules when providing a function', async () => {
  const server = startTServer({
    validationRules: () => [
      (ctx) => {
        ctx.reportError(new GraphQLError('Woah!'));
        return {};
      },
    ],
  });
  const url = new URL(server.url);
  url.searchParams.set('query', '{ idontexist }');
  const result = await fetch(url.toString());
  await expect(result.json()).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Woah!",
        },
      ],
    }
  `);
});

it('should print plain errors in detail', async () => {
  const server = startTServer({});
  const url = new URL(server.url);
  const result = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // missing body
  });
  await expect(result.text()).resolves.toMatchInlineSnapshot(
    `"{"errors":[{"message":"Unparsable JSON body"}]}"`,
  );
});

it('should format errors using the formatter', async () => {
  const formatErrorFn = jest.fn((_err) => new Error('Formatted'));
  const server = startTServer({
    formatError: formatErrorFn,
  });
  const url = new URL(server.url);
  url.searchParams.set('query', '{ idontexist }');
  const res = await fetch(url.toString());
  expect(res.json()).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Formatted",
        },
      ],
    }
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
  const formatErrorFn = jest.fn((_err) => new MyError('Custom toJSON'));
  const server = startTServer({
    formatError: formatErrorFn,
  });
  const url = new URL(server.url);
  url.searchParams.set('query', '{ idontexist }');
  const res = await fetch(url.toString());
  expect(res.json()).resolves.toMatchInlineSnapshot(`
    {
      "errors": [
        {
          "message": "Custom toJSON",
          "toJSON": "used",
        },
      ],
    }
  `);
});
