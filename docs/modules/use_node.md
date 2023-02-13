[graphql-http](../README.md) / use/node

# Module: use/node

## Table of contents

### Type Aliases

- [HandlerOptions](use_node.md#handleroptions)

### Functions

- [createHandler](use_node.md#createhandler)

## Server/node

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](use_http.md#handleroptions)<`Context`\>

Handler options when using the node adapter.

**`Deprecated`**

Please use [http](use_http.md#handleroptions) or [http2](use_http2.md#handleroptions) adapters instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`req`: `IncomingMessage`, `res`: `ServerResponse`<`IncomingMessage`\>) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment.

```js
import http from 'http';
import { createHandler } from 'graphql-http/lib/use/node';
import { schema } from './my-graphql-step';

const server = http.createServer(createHandler({ schema }));

server.listen(4000);
console.log('Listening to port 4000');
```

**`Deprecated`**

Please use [http](use_http.md#createhandler) or [http2](use_http2.md#createhandler) adapters instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_node.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`req`, `res`): `Promise`<`void`\>

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

**`Category`**

Server/http

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |
| `res` | `ServerResponse`<`IncomingMessage`\> |

##### Returns

`Promise`<`void`\>
