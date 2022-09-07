/**
 *
 * audit/utils
 *
 */

import { ExecutionResult } from 'graphql';
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
export function assert<T = unknown>(name: string, actual: T) {
  return {
    toBe: (expected: T) => {
      if (actual !== expected) {
        throw `${name} ${actual} is not ${expected}`;
      }
    },
    toBeLessThanOrEqual: (expected: T extends number ? T : never) => {
      if (!(actual <= expected)) {
        throw `${name} ${actual} is not less than or equal to ${expected}`;
      }
    },
    toBeGreaterThanOrEqual: (expected: T extends number ? T : never) => {
      if (!(actual >= expected)) {
        throw `${name} ${actual} is not greater than or equal to ${expected}`;
      }
    },
    toContain: (
      expected: T extends Array<infer U> ? U : T extends string ? T : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!actual.includes(expected as any)) {
        throw `${name} ${JSON.stringify(
          actual,
        )} does not contain ${JSON.stringify(expected)}`;
      }
    },
    notToContain: (
      expected: T extends Array<infer U> ? U : T extends string ? T : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (actual.includes(expected as any)) {
        throw `${name} ${JSON.stringify(actual)} contains ${JSON.stringify(
          expected,
        )}`;
      }
    },
    toHaveProperty: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prop: T extends Record<any, any> ? PropertyKey : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      if (!(prop in actual)) {
        throw `${name} ${JSON.stringify(
          actual,
        )} does not have a property '${String(prop)}'`;
      }
    },
    notToHaveProperty: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prop: T extends Record<any, any> ? PropertyKey : never,
    ) => {
      // @ts-expect-error types will match, otherwise never
      if (prop in actual) {
        throw `${name} ${JSON.stringify(actual)} does have a property '${String(
          prop,
        )}'`;
      }
    },
  };
}

/**
 * Parses the string as JSON and safely reports parsing issues for audits.
 *
 * Assumes the parsed JSON will be an `ExecutionResult`.
 *
 * @private
 * */
export async function assertBodyAsExecutionResult(res: Response) {
  const str = await res.text();
  try {
    return JSON.parse(str) as ExecutionResult;
  } catch (err) {
    throw `Response body is not valid JSON. Got ${JSON.stringify(str)}`;
  }
}
