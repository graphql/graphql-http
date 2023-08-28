[graphql-http](../README.md) / use/http2

# Module: use/http2

## Table of contents

### Interfaces

- [RequestContext](../interfaces/use_http2.RequestContext.md)

### Type Aliases

- [HandlerOptions](use_http2.md#handleroptions)

### Functions

- [createHandler](use_http2.md#createhandler)
- [parseRequestParams](use_http2.md#parserequestparams)

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
import { schema } from './my-graphql-schema';

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

___

### parseRequestParams

▸ **parseRequestParams**(`req`, `res`): `Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>

The GraphQL over HTTP spec compliant request parser for an incoming GraphQL request.

If the HTTP request _is not_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), the function will respond
on the `Http2ServerResponse` argument and return `null`.

If the HTTP request _is_ a [well-formatted GraphQL over HTTP request](https://graphql.github.io/graphql-over-http/draft/#sec-Request), but is invalid or malformed,
the function will throw an error and it is up to the user to handle and respond as they see fit.

```js
import fs from 'fs';
import http2 from 'http2';
import { parseRequestParams } from 'graphql-http/lib/use/http2';

const server = http2.createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  async (req, res) => {
    if (req.url.startsWith('/graphql')) {
      try {
        const maybeParams = await parseRequestParams(req, res);
        if (!maybeParams) {
          // not a well-formatted GraphQL over HTTP request,
          // parser responded and there's nothing else to do
          return;
        }

        // well-formatted GraphQL over HTTP request,
        // with valid parameters
        res.writeHead(200).end(JSON.stringify(maybeParams, null, '  '));
      } catch (err) {
        // well-formatted GraphQL over HTTP request,
        // but with invalid parameters
        res.writeHead(400).end(err.message);
      }
    } else {
      res.writeHead(404).end();
    }
  },
);

server.listen(4000);
console.log('Listening to port 4000');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Http2ServerRequest` |
| `res` | `Http2ServerResponse` |

#### Returns

`Promise`<[`RequestParams`](../interfaces/common.RequestParams.md) \| ``null``\>
