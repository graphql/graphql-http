/**
 *
 * audit/common
 *
 */

/**
 * Audit requirement levels as per [RFC2119](https://www.rfc-editor.org/rfc/rfc2119).
 */
export type AuditRequirement = 'MUST' | 'SHOULD' | 'MAY';

/**
 * Audit name starting with the audit requirement level.
 */
export type AuditName = `${AuditRequirement} ${string}`;

export interface Audit {
  name: AuditName;
  fn: () => Promise<AuditResult>;
}

export interface AuditOk {
  name: AuditName;
  status: 'ok';
}

export interface AuditFail {
  name: AuditName;
  status: 'warn' | 'error';
  reason: string;
}

export type AuditResult = AuditOk | AuditFail;
