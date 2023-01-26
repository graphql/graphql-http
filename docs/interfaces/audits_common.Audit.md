[graphql-http](../README.md) / [audits/common](../modules/audits_common.md) / Audit

# Interface: Audit

[audits/common](../modules/audits_common.md).Audit

Actual audit test returning an result.

The test function will throw only if the error is fatal.

## Table of contents

### Properties

- [fn](audits_common.Audit.md#fn)
- [id](audits_common.Audit.md#id)
- [name](audits_common.Audit.md#name)

## Properties

### fn

• **fn**: () => `Promise`<[`AuditResult`](../modules/audits_common.md#auditresult)\>

#### Type declaration

▸ (): `Promise`<[`AuditResult`](../modules/audits_common.md#auditresult)\>

##### Returns

`Promise`<[`AuditResult`](../modules/audits_common.md#auditresult)\>

___

### id

• **id**: `string`

Uniquely represents the audit. Helps with pinning audits
without depending on the human readable audit name.

___

### name

• **name**: \`MUST ${string}\` \| \`SHOULD ${string}\` \| \`MAY ${string}\`
