/**
 *
 * test/common
 *
 */

/**
 * Audit requirement levels as per [RFC2119](https://www.rfc-editor.org/rfc/rfc2119).
 */
export type AuditRequirement = 'MUST' | 'SHOULD' | 'MAY';

export interface Audit {
  requirement: AuditRequirement;
  name: string;
  fn: () => Promise<AuditResult>;
}

export interface AuditOk {
  name: string;
  status: 'ok';
}

export interface AuditFail {
  name: string;
  status: 'warn' | 'error';
  reason: string;
}

export type AuditResult = AuditOk | AuditFail;

/**
 * Wrap and prepare an audit for testing.
 *
 * @private
 */
export function audit(
  requirement: AuditRequirement,
  name: string,
  fn: () => Promise<void>,
): Audit {
  return {
    requirement,
    name,
    fn: async () => {
      try {
        await fn();
        return {
          name: requirement + ' ' + name,
          status: 'ok',
        };
      } catch (errOrReason) {
        if (typeof errOrReason !== 'string') {
          // anything thrown that is not an assertion string is considered fatal
          throw errOrReason;
        }
        return {
          name: requirement + ' ' + name,
          status:
            requirement === 'MUST'
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
    toContain: (expected: string) => {
      if (typeof actual !== 'string') {
        throw new Error(`assert.toContain can only be with strings`);
      }
      if (!actual.includes(expected)) {
        throw `'${actual}' does not contain '${expected}'`;
      }
    },
  };
}
