[graphql-http](../README.md) / use/http

# Module: use/http

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_http.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_http.md#handleroptions)

### Functions

- [createHandler](use_http.md#createhandler)
- [parseRequestParams](use_http.md#parserequestparams)

## Server/http

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`IncomingMessage`, [`RequestContext`](../interfaces/use_http.RequestContext.md), `Context`\>

Handler options when using the http adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`req`: `IncomingMessage`, `res`: `ServerResponse`) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment http module.

```js
import http from 'http';
import { createHandler } from 'graphql-http/lib/use/http';
import { schema } from './my-graphql-schema';

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
| `options` | [`HandlerOptions`](use_http.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`req`, `res`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |
| `res` | `ServerResponse` |

##### Returns

`Promise`<`void`\>

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `res`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on the `ServerResponse` argument and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import http from 'http';
import { parseRequestParams } from 'graphql-http/lib/use/http';

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/graphql')) {
    try {
      const maybeParams = await parseRequestParams(req, res);
      if (!maybeParams) {
        // not a well-formatted GraphQL over HTTP request,
        // parser responded and there's nothing else to do
        return;
      }

      // well-formatted GraphQL over HTTP request,
      // with valid parameters
      console.log(maybeParams);

      res.writeHead(200).end();
    } catch (err) {
      // well-formatted GraphQL over HTTP request,
      // but with invalid parameters
      res.writeHead(400).end(err.message);
    }
  } else {
    res.writeHead(404).end();
  }
});

server.listen(4000);
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |
| `res` | `ServerResponse`<`IncomingMessage`\> |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
