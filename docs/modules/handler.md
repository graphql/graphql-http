[graphql-http](../README.md) / handler

# Module: handler

## Table of contents

### Interfaces

- [HandlerOptions](../interfaces/handler.HandlerOptions.md)
- [Request](../interfaces/handler.Request.md)
- [ResponseInit](../interfaces/handler.ResponseInit.md)

### Type Aliases

- [AcceptableMediaType](handler.md#acceptablemediatype)
- [FormatError](handler.md#formaterror)
- [Handler](handler.md#handler)
- [OperationArgs](handler.md#operationargs)
- [OperationContext](handler.md#operationcontext)
- [RequestHeaders](handler.md#requestheaders)
- [Response](handler.md#response)
- [ResponseBody](handler.md#responsebody)
- [ResponseHeaders](handler.md#responseheaders)

### Functions

- [createHandler](handler.md#createhandler)
- [getAcceptableMediaType](handler.md#getacceptablemediatype)
- [isResponse](handler.md#isresponse)
- [makeResponse](handler.md#makeresponse)

## Server

### AcceptableMediaType

Ƭ **AcceptableMediaType**: ``"application/graphql-response+json"`` \| ``"application/json"``

Request's Media-Type that the server accepts.

___

### FormatError

Ƭ **FormatError**: (`err`: `Readonly`<`GraphQLError` \| `Error`\>) => `GraphQLError` \| `Error`

#### Type declaration

▸ (`err`): `GraphQLError` \| `Error`

The (GraphQL) error formatter function.

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Readonly`<`GraphQLError` \| `Error`\> |

##### Returns

`GraphQLError` \| `Error`

___

### Handler

Ƭ **Handler**<`RequestRaw`, `RequestContext`\>: (`req`: [`Request`](../interfaces/handler.Request.md)<`RequestRaw`, `RequestContext`\>) => `Promise`<[`Response`](handler.md#response)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RequestRaw` | `unknown` |
| `RequestContext` | `unknown` |

#### Type declaration

▸ (`req`): `Promise`<[`Response`](handler.md#response)\>

The ready-to-use handler. Simply plug it in your favourite HTTP framework
and enjoy.

Errors thrown from **any** of the provided options or callbacks (or even due to
library misuse or potential bugs) will reject the handler's promise. They are
considered internal errors and you should take care of them accordingly.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`Request`](../interfaces/handler.Request.md)<`RequestRaw`, `RequestContext`\> |

##### Returns

`Promise`<[`Response`](handler.md#response)\>

___

### OperationArgs

Ƭ **OperationArgs**<`Context`\>: `ExecutionArgs` & { `contextValue?`: `Context`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### OperationContext

Ƭ **OperationContext**: `Record`<`PropertyKey`, `unknown`\> \| `symbol` \| `number` \| `string` \| `boolean` \| `undefined` \| ``null``

A concrete GraphQL execution context value type.

Mainly used because TypeScript collapes unions
with `any` or `unknown` to `any` or `unknown`. So,
we use a custom type to allow definitions such as
the `context` server option.

___

### RequestHeaders

Ƭ **RequestHeaders**: { `[key: string]`: `string` \| `string`[] \| `undefined`; `set-cookie?`: `string` \| `string`[]  } \| { `get`: (`key`: `string`) => `string` \| ``null``  }

The incoming request headers the implementing server should provide.

___

### Response

Ƭ **Response**: readonly [body: ResponseBody \| null, init: ResponseInit]

Server agnostic response returned from `graphql-http` containing the
body and init options needing to be coerced to the server implementation in use.

___

### ResponseBody

Ƭ **ResponseBody**: `string`

Server agnostic response body returned from `graphql-http` needing
to be coerced to the server implementation in use.

___

### ResponseHeaders

Ƭ **ResponseHeaders**: { `accept?`: `string` ; `allow?`: `string` ; `content-type?`: `string`  } & `Record`<`string`, `string`\>

The response headers that get returned from graphql-http.

___

### createHandler

▸ **createHandler**<`RequestRaw`, `RequestContext`, `Context`\>(`options`): [`Handler`](handler.md#handler)<`RequestRaw`, `RequestContext`\>

Makes a GraphQL over HTTP spec compliant server handler. The handler can
be used with your favourite server library.

Beware that the handler resolves only after the whole operation completes.

Errors thrown from **any** of the provided options or callbacks (or even due to
library misuse or potential bugs) will reject the handler's promise. They are
considered internal errors and you should take care of them accordingly.

For production environments, its recommended not to transmit the exact internal
error details to the client, but instead report to an error logging tool or simply
the console.

Simple example usage with Node:

```js
import http from 'http';
import { createHandler } from 'graphql-http';
import { schema } from './my-graphql-schema';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create a HTTP server using the handler on `/graphql`
const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/graphql')) {
    return res.writeHead(404).end();
  }

  try {
    const [body, init] = await handler({
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: () => new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => resolve(body));
      }),
      raw: req,
    });
    res.writeHead(init.status, init.statusText, init.headers).end(body);
  } catch (err) {
    // BEWARE not to transmit the exact internal error message in production environments
    res.writeHead(500).end(err.message);
  }
});

server.listen(4000);
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RequestRaw` | `unknown` |
| `RequestContext` | `unknown` |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`RequestRaw`, `RequestContext`, `Context`\> |

#### Returns

[`Handler`](handler.md#handler)<`RequestRaw`, `RequestContext`\>

___

### getAcceptableMediaType

▸ **getAcceptableMediaType**(`acceptHeader`): [`AcceptableMediaType`](handler.md#acceptablemediatype) \| ``null``

Inspects the request and detects the appropriate/acceptable Media-Type
looking at the `Accept` header while complying with the GraphQL over HTTP spec.

#### Parameters

| Name | Type |
| :------ | :------ |
| `acceptHeader` | `undefined` \| ``null`` \| `string` |

#### Returns

[`AcceptableMediaType`](handler.md#acceptablemediatype) \| ``null``

___

### isResponse

▸ **isResponse**(`val`): val is Response

Checks whether the passed value is the `graphql-http` server agnostic response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is Response

___

### makeResponse

▸ **makeResponse**(`resultOrErrors`, `acceptedMediaType`, `formatError`): [`Response`](handler.md#response)

Creates an appropriate GraphQL over HTTP response following the provided arguments.

If the first argument is an `ExecutionResult`, the operation will be treated as "successful".

If the first argument is (an array of) `GraphQLError`, or an `ExecutionResult` without the `data` field, it will be treated
the response will be constructed with the help of `acceptedMediaType` complying with the GraphQL over HTTP spec.

If the first argument is an `Error`, the operation will be treated as a bad request responding with `400: Bad Request` and the
error will be present in the `ExecutionResult` style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resultOrErrors` | readonly `GraphQLError`[] \| `Readonly`<`ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>\> \| `Readonly`<`GraphQLError`\> \| `Readonly`<`Error`\> |
| `acceptedMediaType` | [`AcceptableMediaType`](handler.md#acceptablemediatype) |
| `formatError` | [`FormatError`](handler.md#formaterror) |

#### Returns

[`Response`](handler.md#response)
