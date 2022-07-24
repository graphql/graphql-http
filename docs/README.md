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

TODO: document

___

### ResponseBody

Ƭ **ResponseBody**: `string`

TODO: document

___

### isResponse

▸ **isResponse**(`val`): val is Response

TODO: document

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

Makes a Protocol complient HTTP GraphQL server  handler. The handler can
be used with your favourite server library.

Read more about the Protocol in the PROTOCOL.md documentation file.

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
