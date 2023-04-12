[graphql-http](../README.md) / [audits/common](../modules/audits_common.md) / AuditFail

# Interface: AuditFail

[audits/common](../modules/audits_common.md).AuditFail

Indicates that the audit failed.

If the status is `warn`, the audit is not a requirement but rather a recommendation.

On the other hand, if the status is `error`, the audit is a requirement and the source
is therefore not compliant.

## Table of contents

### Properties

- [id](audits_common.AuditFail.md#id)
- [name](audits_common.AuditFail.md#name)
- [reason](audits_common.AuditFail.md#reason)
- [response](audits_common.AuditFail.md#response)
- [status](audits_common.AuditFail.md#status)

## Properties

### id

• **id**: `string`

Uniquely represents the failing audit. Helps with pinning audits
without depending on the human readable audit name.

___

### name

• **name**: \`MUST ${string}\` \| \`SHOULD ${string}\` \| \`MAY ${string}\`

___

### reason

• **reason**: `string`

___

### response

• **response**: `Response`

___

### status

• **status**: ``"notice"`` \| ``"warn"`` \| ``"error"``
