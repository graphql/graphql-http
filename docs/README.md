graphql-http

# graphql-http

## Table of contents

### Interfaces

- [HandlerOptions](interfaces/HandlerOptions.md)
- [Headers](interfaces/Headers.md)
- [Request](interfaces/Request.md)
- [RequestParams](interfaces/RequestParams.md)
- [ResponseInit](interfaces/ResponseInit.md)
- [Sink](interfaces/Sink.md)

### Type Aliases

- [ExecutionContext](README.md#executioncontext)
- [Handler](README.md#handler)
- [Response](README.md#response)
- [ResponseBody](README.md#responsebody)

### Functions

- [createHandler](README.md#createhandler)
- [isResponse](README.md#isresponse)

## Common

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

### isResponse

▸ **isResponse**(`val`): val is Response

Checks whether the passed value is the `graphql-http` server agnostic response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is Response

## Server

### ExecutionContext

Ƭ **ExecutionContext**: `object` \| `symbol` \| `number` \| `string` \| `boolean` \| `undefined` \| ``null``

A concrete GraphQL execution context value type.

Mainly used because TypeScript collapes unions
with `any` or `unknown` to `any` or `unknown`. So,
we use a custom type to allow definitions such as
the `context` server option.

___

### Handler

Ƭ **Handler**<`RawRequest`\>: (`req`: [`Request`](interfaces/Request.md)<`RawRequest`\>) => `Promise`<[`Response`](README.md#response)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RawRequest` | `unknown` |

#### Type declaration

▸ (`req`): `Promise`<[`Response`](README.md#response)\>

The ready-to-use handler. Simply plug it in your favourite HTTP framework
and enjoy.

Errors thrown from **any** of the provided options or callbacks (or even due to
library misuse or potential bugs) will reject the handler's promise. They are
considered internal errors and you should take care of them accordingly.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`Request`](interfaces/Request.md)<`RawRequest`\> |

##### Returns

`Promise`<[`Response`](README.md#response)\>

___

### createHandler

▸ **createHandler**<`RawRequest`\>(`options`): [`Handler`](README.md#handler)<`RawRequest`\>

Makes a GraphQL over HTTP Protocol compliant server handler. The handler can
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
      body: await new Promise((resolve) => {
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
| `RawRequest` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](interfaces/HandlerOptions.md)<`RawRequest`\> |

#### Returns

[`Handler`](README.md#handler)<`RawRequest`\>
