[graphql-http](../README.md) / [client](../modules/client.md) / ClientOptions

# Interface: ClientOptions

[client](../modules/client.md).ClientOptions

## Table of contents

### Properties

- [abortControllerImpl](client.ClientOptions.md#abortcontrollerimpl)
- [credentials](client.ClientOptions.md#credentials)
- [fetchFn](client.ClientOptions.md#fetchfn)
- [headers](client.ClientOptions.md#headers)
- [referrer](client.ClientOptions.md#referrer)
- [referrerPolicy](client.ClientOptions.md#referrerpolicy)
- [shouldRetry](client.ClientOptions.md#shouldretry)
- [url](client.ClientOptions.md#url)

## Properties

### abortControllerImpl

• `Optional` **abortControllerImpl**: `unknown`

The AbortController implementation to use.

For NodeJS environments before v15 consider using [`node-abort-controller`](https://github.com/southpolesteve/node-abort-controller).

**`Default`**

global.AbortController

___

### credentials

• `Optional` **credentials**: ``"omit"`` \| ``"same-origin"`` \| ``"include"``

Indicates whether the user agent should send cookies from the other domain in the case
of cross-origin requests.

Possible options are:
  - `omit`: Never send or receive cookies.
  - `same-origin`: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script.
  - `include`: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.

**`Default`**

same-origin

___

### fetchFn

• `Optional` **fetchFn**: `unknown`

The Fetch function to use.

For NodeJS environments consider using [`node-fetch`](https://github.com/node-fetch/node-fetch).

**`Default`**

global.fetch

___

### headers

• `Optional` **headers**: `Record`<`string`, `string`\> \| () => ``null`` \| `void` \| `Record`<`string`, `string`\> \| `Promise`<``null`` \| `void` \| `Record`<`string`, `string`\>\>

HTTP headers to pass along the request.

If the option is a function, it will be called on each request.
Returning a Promise is supported too and the request will stall until it
resolves.

A good use-case for having a function is when using the URL for authentication,
where subsequent requests (due to auth) may have a refreshed identity token.

___

### referrer

• `Optional` **referrer**: `string`

A string specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string.

**`Default`**

undefined

___

### referrerPolicy

• `Optional` **referrerPolicy**: ``"same-origin"`` \| ``"no-referrer"`` \| ``"no-referrer-when-downgrade"`` \| ``"origin"`` \| ``"strict-origin"`` \| ``"origin-when-cross-origin"`` \| ``"strict-origin-when-cross-origin"`` \| ``"unsafe-url"``

Specifies the referrer policy to use for the request.

Possible options are:
  - `no-referrer`: Does not send referrer information along with requests to any origin.
  - `no-referrer-when-downgrade`: Sends full referrerURL for requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL.
  - `same-origin`: Sends full referrerURL as referrer information when making same-origin-referrer requests.
  - `origin`: Sends only the ASCII serialization of the request’s referrerURL when making both same-origin-referrer requests and cross-origin-referrer requests.
  - `strict-origin`: Sends the ASCII serialization of the origin of the referrerURL for requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL
  - `origin-when-cross-origin`: Sends full referrerURL when making same-origin-referrer requests, and only the ASCII serialization of the origin of the request’s referrerURL is sent when making cross-origin-referrer requests
  - `strict-origin-when-cross-origin`: Sends full referrerURL when making same-origin-referrer requests, and only the ASCII serialization of the origin of the request’s referrerURL when making cross-origin-referrer requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL.
  - `unsafe-url`: Sends full referrerURL along for both same-origin-referrer requests and cross-origin-referrer requests.

**`Default`**

undefined

___

### shouldRetry

• `Optional` **shouldRetry**: (`err`: [`NetworkError`](../classes/client.NetworkError.md)<[`ResponseLike`](client.ResponseLike.md)\>, `retries`: `number`) => `Promise`<`boolean`\>

#### Type declaration

▸ (`err`, `retries`): `Promise`<`boolean`\>

Control whether the network request error should be retried.

Please note that you can **only** control network errors, all other
errors are considered fatal and will be reported immediately.

You may implement your own waiting strategy by timing the resolution of the returned promise.

Useful for retrying requests that failed because the service is temporarely unavailable.

`retries` argument counts actual retries, so it will begin with
0 after the first failed request.

Returning `false` will report the `err` argument; however, throwing a different error from
the `err` argument, will report it instead.

**`Default`**

'() => false'

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`NetworkError`](../classes/client.NetworkError.md)<[`ResponseLike`](client.ResponseLike.md)\> |
| `retries` | `number` |

##### Returns

`Promise`<`boolean`\>

___

### url

• **url**: `string` \| (`request`: [`RequestParams`](common.RequestParams.md)) => `string` \| `Promise`<`string`\>

URL of the GraphQL over HTTP server to connect.

If the option is a function, it will be called on each request.
Returning a Promise is supported too and the request will stall until it
resolves.

A good use-case for having a function is when using the URL for authentication,
where subsequent requests (due to auth) may have a refreshed identity token.

Function receives the request params. Useful for example, to ease up debugging and DevTools
navigation you might want to use the operation name in the URL's search params (`/graphql?MyQuery`).
