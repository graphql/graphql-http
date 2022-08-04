[graphql-http](../README.md) / Headers

# Interface: Headers

Concrete interface that the headers map should implement.

## Indexable

▪ [key: `string`]: `string` \| `string`[] \| `undefined`

## Table of contents

### Properties

- [accept](Headers.md#accept)
- [allow](Headers.md#allow)
- [content-type](Headers.md#content-type)
- [set-cookie](Headers.md#set-cookie)

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
