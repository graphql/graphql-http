[graphql-http](../README.md) / [audits/server](../modules/audits_server.md) / ServerAuditOptions

# Interface: ServerAuditOptions

[audits/server](../modules/audits_server.md).ServerAuditOptions

Options for server audits required to check GraphQL over HTTP spec conformance.

## Table of contents

### Properties

- [fetchFn](audits_server.ServerAuditOptions.md#fetchfn)
- [url](audits_server.ServerAuditOptions.md#url)

## Properties

### fetchFn

• `Optional` **fetchFn**: `unknown`

The Fetch function to use.

For NodeJS environments consider using [`@whatwg-node/fetch`](https://github.com/ardatan/whatwg-node/tree/master/packages/fetch).

**`Default`**

global.fetch

___

### url

• **url**: `string` \| `Promise`<`string`\> \| () => `string` \| `Promise`<`string`\>

The URL of the GraphQL server for the audit.

A function can be also supplied, in this case -
every audit will invoke the function to get the URL.
