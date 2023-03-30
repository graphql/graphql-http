[graphql-http](../README.md) / use/http2

# Module: use/http2

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_http2.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_http2.md#handleroptions)

### Functions

- [createHandler](use_http2.md#createhandler)

## Server/http2

### HandlerOptions

Ƭ **HandlerOptions**<`Context`\>: [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`Http2ServerRequest`, [`RequestContext`](../interfaces/use_http2.RequestContext.md), `Context`\>

Handler options when using the http adapter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

___

### createHandler

▸ **createHandler**<`Context`\>(`options`): (`req`: `Http2ServerRequest`, `res`: `Http2ServerResponse`) => `Promise`<`void`\>

Create a GraphQL over HTTP spec compliant request handler for
the Node environment http2 module.

 ```shell
$ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

```js
import fs from 'fs';
import http2 from 'http2';
import { createHandler } from 'graphql-http/lib/use/http2';
import { schema } from './my-graphql-step';

const server = http2.createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  createHandler({ schema }),
);

server.listen(4000);
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](use_http2.md#handleroptions)<`Context`\> |

#### Returns

`fn`

▸ (`req`, `res`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Http2ServerRequest` |
| `res` | `Http2ServerResponse` |

##### Returns

`Promise`<`void`\>
