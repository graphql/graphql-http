[graphql-http](../README.md) / use/@netlify/functions

# Module: use/@netlify/functions

## Table of contents

### Type Aliases

- [HandlerOptions](use__netlify_functions.md#handleroptions)

### Functions

- [createHandler](use__netlify_functions.md#createhandler)

## Server/@netlify/functions

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`NetlifyHandlerEvent`, `NetlifyHandlerContext`, `Context`\>

Handler options when using the netlify adapter

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): `NetlifyHandler`

Create a GraphQL over HTTP spec compliant request handler for netlify functions

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use__netlify_functions.md#handleroptions)<`Context`\> |

#### Returns

`NetlifyHandler`
