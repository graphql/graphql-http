[graphql-http](../README.md) / use/fastify

# Module: use/fastify

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_fastify.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_fastify.md#handleroptions)

### Functions

- [createHandler](use_fastify.md#createhandler)

## Server/fastify

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`FastifyRequest`, [`RequestContext`](../interfaces/use_fastify.RequestContext.md), `Context`\>

Handler options when using the fastify adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): `RouteHandler`

Create a GraphQL over HTTP spec compliant request handler for
the fastify framework.

```js
import Fastify from 'fastify'; // yarn add fastify
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './my-graphql-schema';

const fastify = Fastify();
fastify.all('/graphql', createHandler({ schema }));

fastify.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_fastify.md#handleroptions)<`Context`\> |

#### Returns

`RouteHandler`
