[graphql-http](../README.md) / use/koa

# Module: use/koa

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_koa.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_koa.md#handleroptions)

### Functions

- [createHandler](use_koa.md#createhandler)

## Server/koa

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`IncomingMessage`, [`RequestContext`](../interfaces/use_koa.RequestContext.md), `Context`\>

Handler options when using the koa adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): `Middleware`

Create a GraphQL over HTTP spec compliant request handler for
the Koa framework.

```js
import Koa from 'koa'; // yarn add koa
import mount from 'koa-mount'; // yarn add koa-mount
import { createHandler } from 'graphql-http/lib/use/koa';
import { schema } from './my-graphql-schema';

const app = new Koa();
app.use(mount('/', createHandler({ schema })));

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
| `options` | [`HandlerOptions`](use_koa.md#handleroptions)<`Context`\> |

#### Returns

`Middleware`
