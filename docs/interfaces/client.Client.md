[graphql-http](../README.md) / [client](../modules/client.md) / Client

# Interface: Client

[client](../modules/client.md).Client

## Table of contents

### Properties

- [dispose](client.Client.md#dispose)

### Methods

- [subscribe](client.Client.md#subscribe)

## Properties

### dispose

• **dispose**: () => `void`

#### Type declaration

▸ (): `void`

Dispose of the client, cancel all active requests and clean up resources.

##### Returns

`void`

## Methods

### subscribe

▸ **subscribe**<`Data`, `Extensions`\>(`request`, `sink`): () => `void`

Subscribes to receive a response by making an HTTP request.

It uses the `sink` to emit the received data or errors. Returns a _dispose_
function used for canceling active requests and cleaning up.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | `Record`<`string`, `unknown`\> |
| `Extensions` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`RequestParams`](common.RequestParams.md) |
| `sink` | [`Sink`](common.Sink.md)<`ExecutionResult`<`Data`, `Extensions`\>\> |

#### Returns

`fn`

▸ (): `void`

Subscribes to receive a response by making an HTTP request.

It uses the `sink` to emit the received data or errors. Returns a _dispose_
function used for canceling active requests and cleaning up.

##### Returns

`void`
