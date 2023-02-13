[graphql-http](../README.md) / use/node

# Module: use/node

## Table of contents

### Type Aliases

- [HandlerOptions](use_node.md#handleroptions)

### Functions

- [createHandler](use_node.md#createhandler)

## Server/node

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`IncomingMessage`, `undefined`, `Context`\>

Handler options when using the node adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): `RequestListener`

Create a GraphQL over HTTP Protocol compliant request handler for
the Node environment.

```js
import http from 'http';
import { createHandler } from 'graphql-http/lib/use/node';
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
| `options` | [`HandlerOptions`](use_node.md#handleroptions)<`Context`\> |

#### Returns

`RequestListener`
