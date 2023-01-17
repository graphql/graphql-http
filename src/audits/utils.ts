/**
 *
 * audit/utils
 *
 */

import type { ExecutionResult } from 'graphql';
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
      } catch (err) {
        if (!(err instanceof AssertError)) {
          // anything thrown that is not an assertion error is considered fatal
          throw err;
        }
        return {
          name,
          status: name.startsWith('MUST')
            ? // only failing MUSTs are considered errors
              'error'
            : // everything else is optional and considered a warning
              'warn',
          reason: err.reason,
          response: err.response,
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

/**
 * Error thrown when an assertion test fails.
 */
export class AssertError {
  constructor(public response: Response, public reason: string) {
    this.reason = reason;
    this.response = response;
  }
}

/**
 * Will throw an AssertError if the assertion on Response fails.
 *
 * All fatal problems will throw an instance of an Error.
 *
 * The name "ressert" is a wordplay combining "response" and "assert".
 *
 * @private
 */
export function ressert(res: Response) {
  return {
    status: {
      toBe(code: number) {
        if (res.status !== code) {
          throw new AssertError(res, `Response status code is not ${code}`);
        }
      },
      toBeBetween: (min: number, max: number) => {
        if (!(min <= res.status && res.status <= max)) {
          throw new AssertError(
            res,
            `Response status is not between ${min} and ${max}`,
          );
        }
      },
    },
    header(key: 'content-type') {
      return {
        toContain(part: string) {
          if (!res.headers.get(key)?.includes(part)) {
            throw new AssertError(
              res,
              `Response header ${key} does not contain ${part}`,
            );
          }
        },
        notToContain(part: string) {
          if (res.headers.get(key)?.includes(part)) {
            throw new AssertError(
              res,
              `Response header ${key} contains ${part}`,
            );
          }
        },
      };
    },
    bodyAsExecutionResult: {
      data: {
        async toBe(val: ExecutionResult['data']) {
          let body: ExecutionResult;
          try {
            body = await res.json();
          } catch (err) {
            throw new AssertError(res, 'Response body is not valid JSON');
          }
          if (body.data !== val) {
            throw new AssertError(
              res,
              `Response body execution result data is not "${val}"`,
            );
          }
        },
      },
      async toHaveProperty(key: keyof ExecutionResult) {
        let body: ExecutionResult;
        try {
          body = await res.json();
        } catch (err) {
          throw new AssertError(res, 'Response body is not valid JSON');
        }
        if (!(key in body)) {
          throw new AssertError(
            res,
            `Response body execution result does not have a property "${key}"`,
          );
        }
      },
      async notToHaveProperty(key: keyof ExecutionResult) {
        let body: ExecutionResult;
        try {
          body = await res.json();
        } catch (err) {
          throw new AssertError(res, 'Response body is not valid JSON');
        }
        if (key in body) {
          throw new AssertError(
            res,
            `Response body execution result has a property "${key}"`,
          );
        }
      },
    },
  };
}
