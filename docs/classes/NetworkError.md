[graphql-http](../README.md) / NetworkError

# Class: NetworkError<Response\>

A network error caused by the client or an unexpected response from the server.

To avoid bundling DOM typings (because the client can run in Node env too),
you should supply the `Response` generic depending on your Fetch implementation.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Response` | extends [`ResponseLike`](../interfaces/ResponseLike.md) = [`ResponseLike`](../interfaces/ResponseLike.md) |

## Hierarchy

- `Error`

  ↳ **`NetworkError`**

## Table of contents

### Constructors

- [constructor](NetworkError.md#constructor)

### Properties

- [response](NetworkError.md#response)

## Constructors

### constructor

• **new NetworkError**<`Response`\>(`msgOrErrOrResponse`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Response` | extends [`ResponseLike`](../interfaces/ResponseLike.md) = [`ResponseLike`](../interfaces/ResponseLike.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `msgOrErrOrResponse` | `string` \| `Response` \| `Error` |

#### Overrides

Error.constructor

## Properties

### response

• **response**: `undefined` \| `Response`

The underlyig response thats considered an error.

Will be undefined when no response is received,
instead an unexpected network error.
