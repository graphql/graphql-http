[graphql-http](../README.md) / use/fetch

# Module: use/fetch

## Table of contents

### Interfaces

- [FetchAPI](../interfaces/use_fetch.FetchAPI.md)

### Type Aliases

- [HandlerOptions](use_fetch.md#handleroptions)

### Functions

- [createHandler](use_fetch.md#createhandler)
- [parseRequestParams](use_fetch.md#parserequestparams)

## Server/fetch

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`Request`, [`FetchAPI`](../interfaces/use_fetch.FetchAPI.md), `Context`\>

Handler options when using the fetch adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`, `reqCtx?`): (`req`: `Request`) => `Promise`<`Response`\>

Create a GraphQL over HTTP spec compliant request handler for
a fetch environment like Deno, Bun, CloudFlare Workers, Lambdas, etc.

You can use [@whatwg-node/server](https://github.com/ardatan/whatwg-node/tree/master/packages/server) to create a server adapter and
isomorphically use it in _any_ environment. See an example:

```js
import http from 'http';
import { createServerAdapter } from '@whatwg-node/server'; // yarn add @whatwg-node/server
import { createHandler } from 'graphql-http/lib/use/fetch';
import { schema } from './my-graphql-schema';

// Use this adapter in _any_ environment.
const adapter = createServerAdapter({
  handleRequest: createHandler({ schema }),
});

const server = http.createServer(adapter);

server.listen(4000);
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`HandlerOptions`](use_fetch.md#handleroptions)<`Context`\> | - |
| `reqCtx` | `Partial`<[`FetchAPI`](../interfaces/use_fetch.FetchAPI.md)\> | Custom fetch API engine, will use from global scope if left undefined. |

#### Returns

`fn`

▸ (`req`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |

##### Returns

`Promise`<`Response`\>

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `api?`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| `Response`\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

It is important to pass in the `abortedRef` so that the parser does not perform any
operations on a disposed request (see example).

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will return a `Response`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import http from 'http';
import { createServerAdapter } from '@whatwg-node/server'; // yarn add @whatwg-node/server
import { parseRequestParams } from 'graphql-http/lib/use/fetch';

// Use this adapter in _any_ environment.
const adapter = createServerAdapter({
  handleRequest: async (req) => {
    try {
      const paramsOrResponse = await parseRequestParams(req);
      if (paramsOrResponse instanceof Response) {
        // not a well-formatted GraphQL over HTTP request,
        // parser created a response object to use
        return paramsOrResponse;
      }

      // well-formatted GraphQL over HTTP request,
      // with valid parameters
      return new Response(JSON.stringify(paramsOrResponse, null, '  '), {
        status: 200,
      });
    } catch (err) {
      // well-formatted GraphQL over HTTP request,
      // but with invalid parameters
      return new Response(err.message, { status: 400 });
    }
  },
});

const server = http.createServer(adapter);

server.listen(4000);
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |
| `api` | `Partial`<[`FetchAPI`](../interfaces/use_fetch.FetchAPI.md)\> |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| `Response`\>
