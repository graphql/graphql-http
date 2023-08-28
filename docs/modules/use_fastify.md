[graphql-http](../README.md) / use/fastify

# Module: use/fastify

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_fastify.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_fastify.md#handleroptions)

### Functions

- [createHandler](use_fastify.md#createhandler)
- [parseRequestParams](use_fastify.md#parserequestparams)

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
import { createHandler } from 'graphql-http/lib/use/fastify';
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

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `reply`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on the `FastifyReply` argument and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import Fastify from 'fastify'; // yarn add fastify
import { parseRequestParams } from 'graphql-http/lib/use/fastify';

const fastify = Fastify();
fastify.all('/graphql', async (req, reply) => {
  try {
    const maybeParams = await parseRequestParams(req, reply);
    if (!maybeParams) {
      // not a well-formatted GraphQL over HTTP request,
      // parser responded and there's nothing else to do
      return;
    }

    // well-formatted GraphQL over HTTP request,
    // with valid parameters
    reply.status(200).send(JSON.stringify(maybeParams, null, '  '));
  } catch (err) {
    // well-formatted GraphQL over HTTP request,
    // but with invalid parameters
    reply.status(400).send(err.message);
  }
});

fastify.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `FastifyRequest`<`RouteGenericInterface`, `RawServerDefault`, `IncomingMessage`, `FastifySchema`, `FastifyTypeProviderDefault`, `unknown`, `FastifyBaseLogger`, `ResolveFastifyRequestType`<`FastifyTypeProviderDefault`, `FastifySchema`, `RouteGenericInterface`\>\> |
| `reply` | `FastifyReply`<`RawServerDefault`, `IncomingMessage`, `ServerResponse`<`IncomingMessage`\>, `RouteGenericInterface`, `unknown`, `FastifySchema`, `FastifyTypeProviderDefault`, `unknown`\> |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
