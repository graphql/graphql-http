[graphql-http](../README.md) / ServerAuditOptions

# Interface: ServerAuditOptions

Options for server audits required to check GraphQL over HTTP spec conformance.

## Table of contents

### Properties

- [fetchFn](ServerAuditOptions.md#fetchfn)
- [url](ServerAuditOptions.md#url)

## Properties

### fetchFn

• `Optional` **fetchFn**: `unknown`

The Fetch function to use.

For NodeJS environments consider using [`@whatwg-node/fetch`](https://github.com/ardatan/whatwg-node/tree/master/packages/fetch).

**`Default`**

global.fetch

___

### url

• **url**: `string`

The URL of the GraphQL server for the audit.
