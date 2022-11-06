[graphql-http](../README.md) / [handler](../modules/handler.md) / Request

# Interface: Request<Raw, Context\>

[handler](../modules/handler.md).Request

Server agnostic request interface containing the raw request
which is server dependant.

## Type parameters

| Name |
| :------ |
| `Raw` |
| `Context` |

## Table of contents

### Properties

- [body](handler.Request.md#body)
- [context](handler.Request.md#context)
- [headers](handler.Request.md#headers)
- [method](handler.Request.md#method)
- [raw](handler.Request.md#raw)
- [url](handler.Request.md#url)

## Properties

### body

• `Readonly` **body**: ``null`` \| `string` \| `Record`<`string`, `unknown`\> \| () => ``null`` \| `string` \| `Record`<`string`, `unknown`\> \| `Promise`<``null`` \| `string` \| `Record`<`string`, `unknown`\>\>

Parsed request body or a parser function.

If the provided function throws, the error message "Unparsable JSON body" will
be in the erroneous response.

___

### context

• `Readonly` **context**: `Context`

Context value about the incoming request, you're free to pass any information here.

___

### headers

• `Readonly` **headers**: [`RequestHeaders`](../modules/handler.md#requestheaders)

___

### method

• `Readonly` **method**: `string`

___

### raw

• `Readonly` **raw**: `Raw`

The raw request itself from the implementing server.

For example: `express.Request` when using Express, or maybe
`http.IncomingMessage` when just using Node with `http.createServer`.

___

### url

• `Readonly` **url**: `string`
