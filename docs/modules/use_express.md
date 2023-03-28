[graphql-http](../README.md) / use/express

# Module: use/express

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_express.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_express.md#handleroptions)

### Functions

- [createHandler](use_express.md#createhandler)

## Server/express

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`Request`, [`RequestContext`](../interfaces/use_express.RequestContext.md), `Context`\>

Handler options when using the express adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): `Handler`

Create a GraphQL over HTTP spec compliant request handler for
the express framework.

```js
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './my-graphql-schema';

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_express.md#handleroptions)<`Context`\> |

#### Returns

`Handler`
