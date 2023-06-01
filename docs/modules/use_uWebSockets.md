[graphql-http](../README.md) / use/uWebSockets

# Module: use/uWebSockets

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_uWebSockets.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_uWebSockets.md#handleroptions)

### Functions

- [createHandler](use_uWebSockets.md#createhandler)

## Server/uWebSockets

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`HttpRequest`, [`RequestContext`](../interfaces/use_uWebSockets.RequestContext.md), `Context`\>

Handler options when using the http adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`res`: `HttpResponse`, `req`: `HttpRequest`) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment [uWebSockets.js module](https://github.com/uNetworking/uWebSockets.js/).

```js
import uWS from 'uWebSockets.js'; // yarn add uWebSockets.js@uNetworking/uWebSockets.js#<version>
import { createHandler } from 'graphql-http/lib/use/uWebSockets';
import { schema } from './my-graphql-schema';

uWS
  .App()
  .any('/graphql', createHandler({ schema }))
  .listen(4000, () => {
    console.log('Listening to port 4000');
  });
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_uWebSockets.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`res`, `req`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `HttpResponse` |
| `req` | `HttpRequest` |

##### Returns

`Promise`<`void`\>
