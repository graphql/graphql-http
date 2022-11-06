[graphql-http](../README.md) / use/fetch

# Module: use/fetch

## Table of contents

### Interfaces

- [FetchAPI](../interfaces/use_fetch.FetchAPI.md)

### Functions

- [createHandler](use_fetch.md#createhandler)

## Server/fetch

### createHandler

▸ **createHandler**<`Context`\>(`options`, `fetchApi?`): (`req`: `Request`) => `Promise`<`Response`\>

Create a GraphQL over HTTP Protocol compliant request handler for
a fetch environment like Deno, Bun, CloudFlare Workers, Lambdas, etc.

You can use [@whatwg-node/server](https://github.com/ardatan/whatwg-node/tree/master/packages/server) to create a server adapter and
isomorphically use it in _any_ environment. See an example:

```js
import http from 'http';
import { createServerAdapter } from '@whatwg-node/server'; // yarn add @whatwg-node/server
import { createHandler } from 'graphql-http/lib/use/fetch';
import { schema } from './my-graphql-step';

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

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`Request`, [`FetchAPI`](../interfaces/use_fetch.FetchAPI.md), `Context`\> |
| `fetchApi` | `Partial`<[`FetchAPI`](../interfaces/use_fetch.FetchAPI.md)\> |

#### Returns

`fn`

▸ (`req`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |

##### Returns

`Promise`<`Response`\>
