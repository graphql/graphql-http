[graphql-http](../README.md) / use/uWebSockets

# Module: use/uWebSockets

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_uWebSockets.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_uWebSockets.md#handleroptions)

### Functions

- [createHandler](use_uWebSockets.md#createhandler)
- [parseRequestParams](use_uWebSockets.md#parserequestparams)

## Server/uWebSockets

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`HttpRequest`, [`RequestContext`](../interfaces/use_uWebSockets.RequestContext.md), `Context`\>

Handler options when using the http adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`res`: `HttpResponse`, `req`: `HttpRequest`) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment [uWebSockets.js module](https://github.com/uNetworking/uWebSockets.js/).

```js
import uWS from 'uWebSockets.js'; // yarn add uWebSockets.js@uNetworking/uWebSockets.js#<version>
import { createHandler } from 'graphql-http/lib/use/uWebSockets';
import { schema } from './my-graphql-schema';

uWS
  .App()
  .any('/graphql', createHandler({ schema }))
  .listen(4000, () => {
    console.log('Listening to port 4000');
  });
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_uWebSockets.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`res`, `req`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `HttpResponse` |
| `req` | `HttpRequest` |

##### Returns

`Promise`<`void`\>

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `res`, `abortedRef`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

It is important to pass in the `abortedRef` so that the parser does not perform any
operations on a disposed request (see example).

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on the `HttpResponse` argument and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import uWS from 'uWebSockets.js'; // yarn add uWebSockets.js@uNetworking/uWebSockets.js#<version>
import { parseRequestParams } from 'graphql-http/lib/use/uWebSockets';

uWS
  .App()
  .any('/graphql', async (res, req) => {
    const abortedRef = { current: false };
    res.onAborted(() => (abortedRef.current = true));
    try {
      const maybeParams = await parseRequestParams(req, res, abortedRef);
      if (!maybeParams) {
        // not a well-formatted GraphQL over HTTP request,
        // parser responded and there's nothing else to do
        return;
      }

      // well-formatted GraphQL over HTTP request,
      // with valid parameters
      if (!abortedRef.current) {
        res.writeStatus('200 OK');
        res.end(JSON.stringify(maybeParams, null, '  '));
      }
    } catch (err) {
      // well-formatted GraphQL over HTTP request,
      // but with invalid parameters
      if (!abortedRef.current) {
        res.writeStatus('400 Bad Request');
        res.end(err.message);
      }
    }
  })
  .listen(4000, () => {
    console.log('Listening to port 4000');
  });
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `HttpRequest` |
| `res` | `HttpResponse` |
| `abortedRef` | `Object` |
| `abortedRef.current` | `boolean` |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
