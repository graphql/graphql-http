[graphql-http](../README.md) / Request

# Interface: Request<RawRequest\>

Server agnostic request interface containing the raw request
which is server dependant.

## Type parameters

| Name |
| :------ |
| `RawRequest` |

## Table of contents

### Properties

- [body](Request.md#body)
- [headers](Request.md#headers)
- [method](Request.md#method)
- [req](Request.md#req)
- [url](Request.md#url)

## Properties

### body

• `Readonly` **body**: ``null`` \| `string` \| `Record`<`string`, `unknown`\>

___

### headers

• `Readonly` **headers**: [`Headers`](Headers.md)

___

### method

• `Readonly` **method**: `string`

___

### req

• `Readonly` **req**: `RawRequest`

___

### url

• `Readonly` **url**: `string`
