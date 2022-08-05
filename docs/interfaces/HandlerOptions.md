[graphql-http](../README.md) / HandlerOptions

# Interface: HandlerOptions<RawRequest\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `RawRequest` | `unknown` |

## Table of contents

### Properties

- [context](HandlerOptions.md#context)
- [execute](HandlerOptions.md#execute)
- [onOperation](HandlerOptions.md#onoperation)
- [onSubscribe](HandlerOptions.md#onsubscribe)
- [parse](HandlerOptions.md#parse)
- [schema](HandlerOptions.md#schema)
- [validate](HandlerOptions.md#validate)

## Properties

### context

• `Optional` **context**: [`ExecutionContext`](../README.md#executioncontext) \| (`req`: [`Request`](Request.md)<`RawRequest`\>, `args`: `ExecutionArgs`) => [`Response`](../README.md#response) \| [`ExecutionContext`](../README.md#executioncontext) \| `Promise`<[`Response`](../README.md#response) \| [`ExecutionContext`](../README.md#executioncontext)\>

A value which is provided to every resolver and holds
important contextual information like the currently
logged in user, or access to a database.

___

### execute

• `Optional` **execute**: (`args`: `ExecutionArgs`) => `PromiseOrValue`<`ExecutionResult`\>

#### Type declaration

▸ (`args`): `PromiseOrValue`<`ExecutionResult`\>

Implements the "Executing requests" section of the GraphQL specification.

Returns either a synchronous ExecutionResult (if all encountered resolvers
are synchronous), or a Promise of an ExecutionResult that will eventually be
resolved and never rejected.

If the arguments to this function do not result in a legal execution context,
a GraphQLError will be thrown immediately explaining the invalid input.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `ExecutionArgs` |

##### Returns

`PromiseOrValue`<`ExecutionResult`\>

___

### onOperation

• `Optional` **onOperation**: (`req`: [`Request`](Request.md)<`RawRequest`\>, `args`: `ExecutionArgs`, `result`: `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>) => `void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>\>

#### Type declaration

▸ (`req`, `args`, `result`): `void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>\>

Executed after the operation call resolves.

The `OperationResult` argument is the result of operation
execution. It can be an iterator or already a value.

Use this callback to listen for GraphQL operations and
execution result manipulation.

If you want to respond to the client with a custom status and/or body,
you should do by returning a `Request` argument which will stop
further execution.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`Request`](Request.md)<`RawRequest`\> |
| `args` | `ExecutionArgs` |
| `result` | `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> |

##### Returns

`void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>\>

___

### onSubscribe

• `Optional` **onSubscribe**: (`req`: [`Request`](Request.md)<`RawRequest`\>, `params`: [`RequestParams`](RequestParams.md)) => `void` \| [`Response`](../README.md#response) \| `ExecutionArgs` \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionArgs`\>

#### Type declaration

▸ (`req`, `params`): `void` \| [`Response`](../README.md#response) \| `ExecutionArgs` \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionArgs`\>

The subscribe callback executed right after processing the request
before proceeding with the GraphQL operation execution.

If you return `ExecutionArgs` from the callback, it will be used instead of
trying to build one internally. In this case, you are responsible for providing
a ready set of arguments which will be directly plugged in the operation execution.

Omitting the fields `contextValue` from the returned `ExecutionArgs` will use the
provided `context` option, if available.

Useful for preparing the execution arguments following a custom logic. A typical
use-case is persisted queries. You can identify the query from the request parameters
and supply the appropriate GraphQL operation execution arguments.

If you want to respond to the client with a custom status and/or body,
you should do by returning a `Request` argument which will stop
further execution.

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`Request`](Request.md)<`RawRequest`\> |
| `params` | [`RequestParams`](RequestParams.md) |

##### Returns

`void` \| [`Response`](../README.md#response) \| `ExecutionArgs` \| `Promise`<`void` \| [`Response`](../README.md#response) \| `ExecutionArgs`\>

___

### parse

• `Optional` **parse**: (`source`: `string` \| `Source`, `options?`: `ParseOptions`) => `DocumentNode`

#### Type declaration

▸ (`source`, `options?`): `DocumentNode`

Given a GraphQL source, parses it into a Document.
Throws GraphQLError if a syntax error is encountered.

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` \| `Source` |
| `options?` | `ParseOptions` |

##### Returns

`DocumentNode`

___

### schema

• `Optional` **schema**: `GraphQLSchema` \| (`req`: [`Request`](Request.md)<`RawRequest`\>, `args`: `Omit`<`ExecutionArgs`, ``"schema"``\>) => [`Response`](../README.md#response) \| `GraphQLSchema` \| `Promise`<[`Response`](../README.md#response) \| `GraphQLSchema`\>

The GraphQL schema on which the operations will
be executed and validated against.

If a function is provided, it will be called on every
operation request allowing you to manipulate schema
dynamically.

If the schema is left undefined, you're trusted to
provide one in the returned `ExecutionArgs` from the
`onSubscribe` callback.

If you want to respond to the client with a custom status and/or body,
you should do by returning a `Request` argument which will stop
further execution.

___

### validate

• `Optional` **validate**: (`schema`: `GraphQLSchema`, `documentAST`: `DocumentNode`, `rules?`: readonly `ValidationRule`[], `options?`: {}, `typeInfo?`: `TypeInfo`) => `ReadonlyArray`<`GraphQLError`\>

#### Type declaration

▸ (`schema`, `documentAST`, `rules?`, `options?`, `typeInfo?`): `ReadonlyArray`<`GraphQLError`\>

Implements the "Validation" section of the spec.

Validation runs synchronously, returning an array of encountered errors, or
an empty array if no errors were encountered and the document is valid.

A list of specific validation rules may be provided. If not provided, the
default list of rules defined by the GraphQL specification will be used.

Each validation rules is a function which returns a visitor
(see the language/visitor API). Visitor methods are expected to return
GraphQLErrors, or Arrays of GraphQLErrors when invalid.

Validate will stop validation after a `maxErrors` limit has been reached.
Attackers can send pathologically invalid queries to induce a DoS attack,
so by default `maxErrors` set to 100 errors.

Optionally a custom TypeInfo instance may be provided. If not provided, one
will be created from the provided schema.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `GraphQLSchema` | - |
| `documentAST` | `DocumentNode` | - |
| `rules?` | readonly `ValidationRule`[] | - |
| `options?` | `Object` | - |
| `typeInfo?` | `TypeInfo` | **`Deprecated`**  will be removed in 17.0.0 |

##### Returns

`ReadonlyArray`<`GraphQLError`\>
