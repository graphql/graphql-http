[graphql-http](../README.md) / audits/common

# Module: audits/common

## Table of contents

### Interfaces

- [Audit](../interfaces/audits_common.Audit.md)
- [AuditFail](../interfaces/audits_common.AuditFail.md)
- [AuditOk](../interfaces/audits_common.AuditOk.md)

### Type Aliases

- [AuditName](audits_common.md#auditname)
- [AuditRequirement](audits_common.md#auditrequirement)
- [AuditResult](audits_common.md#auditresult)

## Audits

### AuditName

Ƭ **AuditName**: \`${AuditRequirement} ${string}\`

Audit name starting with the audit requirement level.

___

### AuditRequirement

Ƭ **AuditRequirement**: ``"MUST"`` \| ``"SHOULD"`` \| ``"MAY"``

Audit requirement levels as per [RFC2119](https://www.rfc-editor.org/rfc/rfc2119).

___

### AuditResult

Ƭ **AuditResult**: [`AuditOk`](../interfaces/audits_common.AuditOk.md) \| [`AuditFail`](../interfaces/audits_common.AuditFail.md)

Result of the performed audit. See `AuditOk` and `AuditFail` for more information.
