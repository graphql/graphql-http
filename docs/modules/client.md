[graphql-http](../README.md) / client

# Module: client

## Table of contents

### References

- [RequestParams](client.md#requestparams)
- [Sink](client.md#sink)

### Classes

- [NetworkError](../classes/client.NetworkError.md)

### Interfaces

- [Client](../interfaces/client.Client.md)
- [ClientOptions](../interfaces/client.ClientOptions.md)
- [ResponseLike](../interfaces/client.ResponseLike.md)

### Functions

- [createClient](client.md#createclient)

## Client

### createClient

▸ **createClient**(`options`): [`Client`](../interfaces/client.Client.md)

Creates a disposable GraphQL over HTTP client to transmit
GraphQL operation results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ClientOptions`](../interfaces/client.ClientOptions.md) |

#### Returns

[`Client`](../interfaces/client.Client.md)

## Other

### RequestParams

Re-exports [RequestParams](../interfaces/common.RequestParams.md)

___

### Sink

Re-exports [Sink](../interfaces/common.Sink.md)
