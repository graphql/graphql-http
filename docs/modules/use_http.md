[graphql-http](../README.md) / use/http

# Module: use/http

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_http.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_http.md#handleroptions)

### Functions

- [createHandler](use_http.md#createhandler)

## Server/http

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`IncomingMessage`, [`RequestContext`](../interfaces/use_http.RequestContext.md), `Context`\>

Handler options when using the http adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`req`: `IncomingMessage`, `res`: `ServerResponse`) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment http module.

```js
import http from 'http';
import { createHandler } from 'graphql-http/lib/use/http';
import { schema } from './my-graphql-step';

const server = http.createServer(createHandler({ schema }));

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
| `options` | [`HandlerOptions`](use_http.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`req`, `res`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |
| `res` | `ServerResponse` |

##### Returns

`Promise`<`void`\>
