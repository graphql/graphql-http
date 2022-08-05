[graphql-http](../README.md) / RequestHeaders

# Interface: RequestHeaders

The incoming request headers the implementing server should provide.

## Indexable

▪ [key: `string`]: `string` \| `string`[] \| `undefined`

## Table of contents

### Properties

- [accept](RequestHeaders.md#accept)
- [allow](RequestHeaders.md#allow)
- [content-type](RequestHeaders.md#content-type)
- [set-cookie](RequestHeaders.md#set-cookie)

## Properties

### accept

• `Optional` **accept**: `string`

___

### allow

• `Optional` **allow**: `string`

___

### content-type

• `Optional` **content-type**: `string`

___

### set-cookie

• `Optional` **set-cookie**: `string` \| `string`[]

Always an array in Node. Duplicates are added to it.
Not necessarily true for other environments, make sure
to check the type during runtime.
