[graphql-http](../README.md) / use/koa

# Module: use/koa

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_koa.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_koa.md#handleroptions)

### Functions

- [createHandler](use_koa.md#createhandler)
- [parseRequestParams](use_koa.md#parserequestparams)

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

___

### parseRequestParams

▸ **parseRequestParams**(`ctx`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on Koa's `ParameterizedContext` response and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import Koa from 'koa'; // yarn add koa
import mount from 'koa-mount'; // yarn add koa-mount
import { parseRequestParams } from 'graphql-http/lib/use/koa';

const app = new Koa();
app.use(
  mount('/', async (ctx) => {
    try {
      const maybeParams = await parseRequestParams(ctx);
      if (!maybeParams) {
        // not a well-formatted GraphQL over HTTP request,
        // parser responded and there's nothing else to do
        return;
      }

      // well-formatted GraphQL over HTTP request,
      // with valid parameters
      ctx.response.status = 200;
      ctx.body = JSON.stringify(maybeParams, null, '  ');
    } catch (err) {
      // well-formatted GraphQL over HTTP request,
      // but with invalid parameters
      ctx.response.status = 400;
      ctx.body = err.message;
    }
  }),
);

app.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `ParameterizedContext` |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
