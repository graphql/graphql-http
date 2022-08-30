[graphql-http](../README.md) / AuditFail

# Interface: AuditFail

Indicates that the audit failed.

If the status is `warn`, the audit is not a requirement but rather a recommendation.

On the other hand, if the status is `error`, the audit is a requirement and the source
is therefore not compliant.

## Table of contents

### Properties

- [name](AuditFail.md#name)
- [reason](AuditFail.md#reason)
- [status](AuditFail.md#status)

## Properties

### name

• **name**: \`MUST ${string}\` \| \`SHOULD ${string}\` \| \`MAY ${string}\`

___

### reason

• **reason**: `string`

___

### status

• **status**: ``"warn"`` \| ``"error"``
