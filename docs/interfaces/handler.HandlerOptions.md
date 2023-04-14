[graphql-http](../README.md) / [handler](../modules/handler.md) / HandlerOptions

# Interface: HandlerOptions<RequestRaw, RequestContext, Context\>

[handler](../modules/handler.md).HandlerOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `RequestRaw` | `unknown` |
| `RequestContext` | `unknown` |
| `Context` | extends [`OperationContext`](../modules/handler.md#operationcontext) = `undefined` |

## Table of contents

### Properties

- [context](handler.HandlerOptions.md#context)
- [execute](handler.HandlerOptions.md#execute)
- [formatError](handler.HandlerOptions.md#formaterror)
- [getOperationAST](handler.HandlerOptions.md#getoperationast)
- [onOperation](handler.HandlerOptions.md#onoperation)
- [onSubscribe](handler.HandlerOptions.md#onsubscribe)
- [parse](handler.HandlerOptions.md#parse)
- [rootValue](handler.HandlerOptions.md#rootvalue)
- [schema](handler.HandlerOptions.md#schema)
- [validate](handler.HandlerOptions.md#validate)
- [validationRules](handler.HandlerOptions.md#validationrules)

## Properties

### context

• `Optional` **context**: `Context` \| (`req`: [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\>, `params`: [`RequestParams`](common.RequestParams.md)) => [`Response`](../modules/handler.md#response) \| `Context` \| `Promise`<[`Response`](../modules/handler.md#response) \| `Context`\>

A value which is provided to every resolver and holds
important contextual information like the currently
logged in user, or access to a database.

___

### execute

• `Optional` **execute**: (`args`: `ExecutionArgs`) => `PromiseOrValue`<`ExecutionResult`\>

#### Type declaration

▸ (`args`): `PromiseOrValue`<`ExecutionResult`\>

Is the `execute` function from GraphQL which is
used to execute the query and mutation operations.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `ExecutionArgs` |

##### Returns

`PromiseOrValue`<`ExecutionResult`\>

___

### formatError

• `Optional` **formatError**: [`FormatError`](../modules/handler.md#formaterror)

Format handled errors to your satisfaction. Either GraphQL errors
or safe request processing errors are meant by "handleded errors".

If multiple errors have occured, all of them will be mapped using
this formatter.

___

### getOperationAST

• `Optional` **getOperationAST**: (`documentAST`: `DocumentNode`, `operationName?`: `Maybe`<`string`\>) => `Maybe`<`OperationDefinitionNode`\>

#### Type declaration

▸ (`documentAST`, `operationName?`): `Maybe`<`OperationDefinitionNode`\>

GraphQL operation AST getter used for detecting the operation type.

##### Parameters

| Name | Type |
| :------ | :------ |
| `documentAST` | `DocumentNode` |
| `operationName?` | `Maybe`<`string`\> |

##### Returns

`Maybe`<`OperationDefinitionNode`\>

___

### onOperation

• `Optional` **onOperation**: (`req`: [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\>, `args`: [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>, `result`: `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\>) => `void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| `Promise`<`void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response)\>

#### Type declaration

▸ (`req`, `args`, `result`): `void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| `Promise`<`void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response)\>

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
| `req` | [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\> |
| `args` | [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\> |
| `result` | `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> |

##### Returns

`void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| `Promise`<`void` \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response)\>

___

### onSubscribe

• `Optional` **onSubscribe**: (`req`: [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\>, `params`: [`RequestParams`](common.RequestParams.md)) => `void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\> \| `Promise`<`void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>\>

#### Type declaration

▸ (`req`, `params`): `void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\> \| `Promise`<`void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>\>

The subscribe callback executed right after processing the request
before proceeding with the GraphQL operation execution.

If you return `ExecutionResult` from the callback, it will be used
directly for responding to the request. Useful for implementing a response
cache.

If you return `ExecutionArgs` from the callback, it will be used instead of
trying to build one internally. In this case, you are responsible for providing
a ready set of arguments which will be directly plugged in the operation execution.

You *must* validate the `ExecutionArgs` yourself if returning them.

If you return an array of `GraphQLError` from the callback, they will be reported
to the client while complying with the spec.

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
| `req` | [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\> |
| `params` | [`RequestParams`](common.RequestParams.md) |

##### Returns

`void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\> \| `Promise`<`void` \| readonly `GraphQLError`[] \| `ExecutionResult`<`ObjMap`<`unknown`\>, `ObjMap`<`unknown`\>\> \| [`Response`](../modules/handler.md#response) \| [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>\>

___

### parse

• `Optional` **parse**: (`source`: `string` \| `Source`, `options?`: `ParseOptions`) => `DocumentNode`

#### Type declaration

▸ (`source`, `options?`): `DocumentNode`

GraphQL parse function allowing you to apply a custom parser.

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` \| `Source` |
| `options?` | `ParseOptions` |

##### Returns

`DocumentNode`

___

### rootValue

• `Optional` **rootValue**: `unknown`

The GraphQL root value or resolvers to go alongside the execution.
Learn more about them here: https://graphql.org/learn/execution/#root-fields-resolvers.

If you return from `onSubscribe`, and the returned value is
missing the `rootValue` field, the relevant operation root
will be used instead.

___

### schema

• `Optional` **schema**: `GraphQLSchema` \| (`req`: [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\>, `args`: `Omit`<[`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>, ``"schema"``\>) => [`Response`](../modules/handler.md#response) \| `GraphQLSchema` \| `Promise`<[`Response`](../modules/handler.md#response) \| `GraphQLSchema`\>

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

A custom GraphQL validate function allowing you to apply your
own validation rules.

Will not be used when implementing a custom `onSubscribe`.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `GraphQLSchema` | - |
| `documentAST` | `DocumentNode` | - |
| `rules?` | readonly `ValidationRule`[] | - |
| `options?` | `Object` | - |
| `typeInfo?` | `TypeInfo` | **`Deprecated`** will be removed in 17.0.0 |

##### Returns

`ReadonlyArray`<`GraphQLError`\>

___

### validationRules

• `Optional` **validationRules**: readonly `ValidationRule`[] \| (`req`: [`Request`](handler.Request.md)<`RequestRaw`, `RequestContext`\>, `args`: [`OperationArgs`](../modules/handler.md#operationargs)<`Context`\>, `specifiedRules`: readonly `ValidationRule`[]) => readonly `ValidationRule`[] \| `Promise`<readonly `ValidationRule`[]\>

The validation rules for running GraphQL validate.

When providing an array, the rules will be APPENDED to the default
`specifiedRules` array provided by the graphql-js module.

Alternatively, providing a function instead will OVERWRITE the defaults
and use exclusively the rules returned by the function. The third (last)
argument of the function are the default `specifiedRules` array provided
by the graphql-js module, you're free to prepend/append the defaults to
your rule set, or omit them altogether.
