/**
 *
 * test/common
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

/**
 * Wrap and prepare an audit for testing.
 *
 * @private
 */
export function audit(name: AuditName, fn: () => Promise<void>): Audit {
  return {
    name,
    fn: async () => {
      try {
        await fn();
        return {
          name,
          status: 'ok',
        };
      } catch (errOrReason) {
        if (typeof errOrReason !== 'string') {
          // anything thrown that is not an assertion string is considered fatal
          throw errOrReason;
        }
        return {
          name,
          status: name.startsWith('MUST')
            ? // only failing MUSTs are considered errors
              'error'
            : // everything else is optional and considered a warning
              'warn',
          reason: errOrReason,
        };
      }
    },
  };
}

/**
 * Will throw a string if the assertion fails.
 *
 * All fatal problems will throw an instance of Error.
 *
 * @private
 */
export function assert(actual: unknown) {
  return {
    toBe: (expected: unknown) => {
      if (actual !== expected) {
        throw `${actual} is not equal to ${expected}`;
      }
    },
    toBeLessThanOrEqual: (expected: number) => {
      if (typeof actual !== 'number') {
        throw new Error(
          'assert.toBeLessThanOrEqual can only be used with numbers',
        );
      }
      if (!(actual <= expected)) {
        throw `${actual} is not less than or equal to ${expected}`;
      }
    },
    toBeGreaterThanOrEqual: (expected: number) => {
      if (typeof actual !== 'number') {
        throw new Error(
          'assert.toBeGreaterThanOrEqual can only be used with numbers',
        );
      }
      if (!(actual >= expected)) {
        throw `${actual} is not greater than or equal to ${expected}`;
      }
    },
    toContain: (expected: string) => {
      if (typeof actual !== 'string') {
        throw new Error('assert.toContain can only be used with strings');
      }
      if (!actual.includes(expected)) {
        throw `'${actual}' does not contain '${expected}'`;
      }
    },
    notToHaveProperty: (prop: string) => {
      if (actual == null || typeof actual !== 'object') {
        throw new Error(
          'assert.notToHaveProperty can only be used with objects',
        );
      }
      if (prop in actual) {
        throw `${JSON.stringify(actual)} does have a property '${prop}'`;
      }
    },
  };
}
