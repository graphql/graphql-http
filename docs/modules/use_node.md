[graphql-http](../README.md) / use/node

# Module: use/node

## Table of contents

### Functions

- [createHandler](use_node.md#createhandler)

## Server/node

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
| `options` | [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`IncomingMessage`, `undefined`, `Context`\> |

#### Returns

`RequestListener`
