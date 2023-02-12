[graphql-http](../README.md) / audits/render

# Module: audits/render

## Table of contents

### Functions

- [renderAuditResultsToHTML](audits_render.md#renderauditresultstohtml)

## Functions

### renderAuditResultsToHTML

▸ **renderAuditResultsToHTML**(`results`): `Promise`<`string`\>

Renders the provided audit results to well-formatted and valid HTML.

Do note that the rendered result is not an HTML document, it's rather
just a component with results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [`AuditResult`](audits_common.md#auditresult)[] |

#### Returns

`Promise`<`string`\>
