graphql-http

# graphql-http

## Table of contents

### Classes

- [NetworkError](classes/NetworkError.md)

### Interfaces

- [Audit](interfaces/Audit.md)
- [AuditFail](interfaces/AuditFail.md)
- [AuditOk](interfaces/AuditOk.md)
- [Client](interfaces/Client.md)
- [ClientOptions](interfaces/ClientOptions.md)
- [HandlerOptions](interfaces/HandlerOptions.md)
- [Request](interfaces/Request.md)
- [RequestHeaders](interfaces/RequestHeaders.md)
- [RequestParams](interfaces/RequestParams.md)
- [ResponseInit](interfaces/ResponseInit.md)
- [ResponseLike](interfaces/ResponseLike.md)
- [ServerAuditOptions](interfaces/ServerAuditOptions.md)
- [Sink](interfaces/Sink.md)

### Type Aliases

- [AcceptableMediaType](README.md#acceptablemediatype)
- [AuditName](README.md#auditname)
- [AuditRequirement](README.md#auditrequirement)
- [AuditResult](README.md#auditresult)
- [ExecutionContext](README.md#executioncontext)
- [Handler](README.md#handler)
- [Response](README.md#response)
- [ResponseBody](README.md#responsebody)
- [ResponseHeaders](README.md#responseheaders)

### Functions

- [auditServer](README.md#auditserver)
- [createClient](README.md#createclient)
- [createHandler](README.md#createhandler)
- [getAcceptableMediaType](README.md#getacceptablemediatype)
- [isResponse](README.md#isresponse)
- [makeResponse](README.md#makeresponse)
- [serverAudits](README.md#serveraudits)

## Client

### createClient

▸ **createClient**(`options`): [`Client`](interfaces/Client.md)

Creates a disposable GraphQL over HTTP client to transmit
GraphQL operation results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ClientOptions`](interfaces/ClientOptions.md) |

#### Returns

[`Client`](interfaces/Client.md)

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

### ResponseHeaders

Ƭ **ResponseHeaders**: { `accept?`: `string` ; `allow?`: `string` ; `content-type?`: `string`  } & `Record`<`string`, `string`\>

The response headers that get returned from graphql-http.

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

## Other

### AuditName

Ƭ **AuditName**: \`${AuditRequirement} ${string}\`

Audit name starting with the audit requirement level.

___

### AuditRequirement

Ƭ **AuditRequirement**: ``"MUST"`` \| ``"SHOULD"`` \| ``"MAY"``

Audit requirement levels as per [RFC2119](https://www.rfc-editor.org/rfc/rfc2119).

___

### AuditResult

Ƭ **AuditResult**: [`AuditOk`](interfaces/AuditOk.md) \| [`AuditFail`](interfaces/AuditFail.md)

___

### auditServer

▸ **auditServer**(`opts`): `Promise`<[`AuditResult`](README.md#auditresult)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`ServerAuditOptions`](interfaces/ServerAuditOptions.md) |

#### Returns

`Promise`<[`AuditResult`](README.md#auditresult)[]\>

___

### serverAudits

▸ **serverAudits**(`opts`): [`Audit`](interfaces/Audit.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`ServerAuditOptions`](interfaces/ServerAuditOptions.md) |

#### Returns

[`Audit`](interfaces/Audit.md)[]

## Server

### AcceptableMediaType

Ƭ **AcceptableMediaType**: ``"application/graphql-response+json"`` \| ``"application/json"``

Request's Media-Type that the server accepts.

___

### ExecutionContext

Ƭ **ExecutionContext**: `object` \| `symbol` \| `number` \| `string` \| `boolean` \| `undefined` \| ``null``

A concrete GraphQL execution context value type.

Mainly used because TypeScript collapes unions
with `any` or `unknown` to `any` or `unknown`. So,
we use a custom type to allow definitions such as
the `context` server option.

___

### Handler

Ƭ **Handler**<`RawRequest`, `Context`\>: (`req`: [`Request`](interfaces/Request.md)<`RawRequest`, `Context`\>) => `Promise`<[`Response`](README.md#response)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RawRequest` | `unknown` |
| `Context` | `unknown` |

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
| `req` | [`Request`](interfaces/Request.md)<`RawRequest`, `Context`\> |

##### Returns

`Promise`<[`Response`](README.md#response)\>

___

### createHandler

▸ **createHandler**<`RawRequest`, `Context`\>(`options`): [`Handler`](README.md#handler)<`RawRequest`, `Context`\>

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
| `RawRequest` | `unknown` |
| `Context` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](interfaces/HandlerOptions.md)<`RawRequest`, `Context`\> |

#### Returns

[`Handler`](README.md#handler)<`RawRequest`, `Context`\>

___

### getAcceptableMediaType

▸ **getAcceptableMediaType**(`acceptHeader`): [`AcceptableMediaType`](README.md#acceptablemediatype) \| ``null``

Inspects the request and detects the appropriate/acceptable Media-Type
looking at the `Accept` header while complying with the GraphQL over HTTP Protocol.

#### Parameters

| Name | Type |
| :------ | :------ |
| `acceptHeader` | `undefined` \| ``null`` \| `string` |

#### Returns

[`AcceptableMediaType`](README.md#acceptablemediatype) \| ``null``

___

### makeResponse

▸ **makeResponse**(`resultOrErrors`, `acceptedMediaType`): [`Response`](README.md#response)

Creates an appropriate GraphQL over HTTP response following the provided arguments.

If the first argument is an `ExecutionResult`, the operation will be treated as "successful".

If the first argument is _any_ object without the `data` field, it will be treated as an error (as per the spec)
and the response will be constructed with the help of `acceptedMediaType` complying with the GraphQL over HTTP Protocol.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resultOrErrors` | readonly `GraphQLError`[] \| `Readonly`<`ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>\> \| `Readonly`<`GraphQLError`\> |
| `acceptedMediaType` | [`AcceptableMediaType`](README.md#acceptablemediatype) |

#### Returns

[`Response`](README.md#response)
