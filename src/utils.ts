/**
 *
 * utils
 *
 */

import type { ExecutionResult } from 'graphql';

/** @private */
export function extendedTypeof(
  val: unknown,
):
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'
  | 'null' {
  if (val === null) {
    return 'null';
  }
  if (Array.isArray(val)) {
    return 'array';
  }
  return typeof val;
}

/** @private */
export function isObject(val: unknown): val is Record<
  PropertyKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  return typeof val === 'object' && val !== null;
}

/** @private */
export function isExecutionResult(val: unknown): val is ExecutionResult {
  return (
    isObject(val) &&
    ('data' in val || ('data' in val && val.data == null && 'errors' in val))
  );
}

/** @private */
export function isAsyncIterable<T = unknown>(
  val: unknown,
): val is AsyncIterable<T> {
  return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
