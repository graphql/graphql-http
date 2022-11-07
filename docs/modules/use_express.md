[graphql-http](../README.md) / use/express

# Module: use/express

## Table of contents

### Functions

- [createHandler](use_express.md#createhandler)

## Server/express

### createHandler

▸ **createHandler**<`Context`\>(`options`): `Handler`

Create a GraphQL over HTTP Protocol compliant request handler for
the express framework.

```js
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './my-graphql-schema';

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 4000 });
console.log('Listening to port 4000');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`OperationContext`](handler.md#operationcontext) = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HandlerOptions`](../interfaces/handler.HandlerOptions.md)<`Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `undefined`, `Context`\> |

#### Returns

`Handler`
