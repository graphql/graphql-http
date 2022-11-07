[graphql-http](../README.md) / use/fastify

# Module: use/fastify

## Table of contents

### Functions

- [createHandler](use_fastify.md#createhandler)

## Server/fastify

### createHandler

▸ **createHandler**<`Context`\>(`options`): `RouteHandler`

Create a GraphQL over HTTP Protocol compliant request handler for
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
| `options` | [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`FastifyRequest`<`RouteGenericInterface`, `RawServerDefault`, `IncomingMessage`, `FastifySchema`, `FastifyTypeProviderDefault`, `unknown`, `FastifyBaseLogger`, `ResolveFastifyRequestType`<`FastifyTypeProviderDefault`, `FastifySchema`, `RouteGenericInterface`\>\>, `undefined`, `Context`\> |

#### Returns

`RouteHandler`
