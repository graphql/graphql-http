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
export function audit(
  id: string,
  name: AuditName,
  fn: () => Promise<void>,
): Audit {
  return {
    id,
    name,
    fn: async () => {
      try {
        await fn();
        return {
          id,
          name,
          status: 'ok',
        };
      } catch (err) {
        if (!(err instanceof AuditError)) {
          // anything thrown that is not an assertion error is considered fatal
          throw err;
        }
        return {
          id,
          name,
          status: name.startsWith('MUST')
            ? // failing MUSTs are considered errors
              'error'
            : name.startsWith('SHOULD')
            ? // recommendations are warnings
              'warn'
            : // everything else is truly optional
              'notice',
          reason: err.reason,
          response: err.response,
        };
      }
    },
  };
}

/**
 * Error thrown when an assertion test fails.
 *
 * @private
 */
export class AuditError {
  /**
   * Response from the server.
   */
  public response: Response;
  /**
   * Reason for the failing audit.
   */
  public reason: string;
  constructor(response: Response, reason: string) {
    this.response = response;
    this.reason = reason;
  }
}

/**
 * Will throw an AuditError if the assertion on Response fails.
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
          throw new AuditError(res, `Response status code is not ${code}`);
        }
      },
      toBeBetween: (min: number, max: number) => {
        if (!(min <= res.status && res.status <= max)) {
          throw new AuditError(
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
            throw new AuditError(
              res,
              `Response header ${key} does not contain ${part}`,
            );
          }
        },
        notToContain(part: string) {
          if (res.headers.get(key)?.includes(part)) {
            throw new AuditError(
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
          const clonedRes = res.clone(); // allow the body to be re-read
          const body = await assertBodyAsExecutionResult(res);
          if (body.data !== val) {
            throw new AuditError(
              clonedRes,
              `Response body execution result data is not "${val}"`,
            );
          }
        },
      },
      async toHaveProperty(key: keyof ExecutionResult) {
        const clonedRes = res.clone(); // allow the body to be re-read
        const body = await assertBodyAsExecutionResult(res);
        if (!(key in body)) {
          throw new AuditError(
            clonedRes,
            `Response body execution result does not have a property "${key}"`,
          );
        }
      },
      async notToHaveProperty(key: keyof ExecutionResult) {
        const clonedRes = res.clone(); // allow the body to be re-read
        const body = await assertBodyAsExecutionResult(res);
        if (key in body) {
          throw new AuditError(
            clonedRes,
            `Response body execution result has a property "${key}"`,
          );
        }
      },
    },
  };
}

/** @private */
async function assertBodyAsExecutionResult(
  res: Response,
): Promise<ExecutionResult> {
  let decoded: string;
  try {
    const decoder = new TextDecoder('utf-8');
    const buff = await res.arrayBuffer();
    decoded = decoder.decode(buff);
  } catch (err) {
    throw new AuditError(res, 'Response body is not UTF-8 encoded');
  }

  let body: ExecutionResult;
  try {
    body = JSON.parse(decoded);
  } catch (err) {
    throw new AuditError(res, 'Response body is not valid JSON');
  }

  return body;
}
