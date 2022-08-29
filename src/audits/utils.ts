/**
 *
 * audit/utils
 *
 */

import { Audit, AuditName } from './common';

export * from '../utils';

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
export function assert<T = unknown>(actual: T) {
  return {
    toBe: (expected: T) => {
      if (actual !== expected) {
        throw `${actual} is not ${expected}`;
      }
    },
    toBeLessThanOrEqual: (expected: T extends number ? T : never) => {
      if (!(actual <= expected)) {
        throw `${actual} is not less than or equal to ${expected}`;
      }
    },
    toBeGreaterThanOrEqual: (expected: T extends number ? T : never) => {
      if (!(actual >= expected)) {
        throw `${actual} is not greater than or equal to ${expected}`;
      }
    },
    toContain: (
      expected: T extends Array<infer U> ? U : T extends string ? T : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!actual.includes(expected as any)) {
        throw `'${actual}' does not contain '${expected}'`;
      }
    },
    notToHaveProperty: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prop: T extends Record<any, any> ? PropertyKey : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      if (prop in actual) {
        throw `${JSON.stringify(actual)} does have a property '${String(
          prop,
        )}'`;
      }
    },
  };
}
