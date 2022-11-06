[graphql-http](../README.md) / audits/server

# Module: audits/server

## Table of contents

### Interfaces

- [ServerAuditOptions](../interfaces/audits_server.ServerAuditOptions.md)

### Functions

- [auditServer](audits_server.md#auditserver)
- [serverAudits](audits_server.md#serveraudits)

## Audits

### auditServer

▸ **auditServer**(`opts`): `Promise`<[`AuditResult`](audits_common.md#auditresult)[]\>

Performs the full list of server audits required for GraphQL over HTTP spec conformance.

Please consult the `AuditResult` for more information.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`ServerAuditOptions`](../interfaces/audits_server.ServerAuditOptions.md) |

#### Returns

`Promise`<[`AuditResult`](audits_common.md#auditresult)[]\>

___

### serverAudits

▸ **serverAudits**(`opts`): [`Audit`](../interfaces/audits_common.Audit.md)[]

List of server audits required to check GraphQL over HTTP spec conformance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`ServerAuditOptions`](../interfaces/audits_server.ServerAuditOptions.md) |

#### Returns

[`Audit`](../interfaces/audits_common.Audit.md)[]
