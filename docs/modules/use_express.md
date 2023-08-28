[graphql-http](../README.md) / use/express

# Module: use/express

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_express.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_express.md#handleroptions)

### Functions

- [createHandler](use_express.md#createhandler)
- [parseRequestParams](use_express.md#parserequestparams)

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

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `res`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on the `Response` argument and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import express from 'express'; // yarn add express
import { parseRequestParams } from 'graphql-http/lib/use/express';

const app = express();
app.all('/graphql', async (req, res) => {
  try {
    const maybeParams = await parseRequestParams(req, res);
    if (!maybeParams) {
      // not a well-formatted GraphQL over HTTP request,
      // parser responded and there's nothing else to do
      return;
    }

    // well-formatted GraphQL over HTTP request,
    // with valid parameters
    res.writeHead(200).end(JSON.stringify(maybeParams, null, '  '));
  } catch (err) {
    // well-formatted GraphQL over HTTP request,
    // but with invalid parameters
    res.writeHead(400).end(err.message);
  }
});

app.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
