/**
 *
 * utils
 *
 */

import type { ExecutionResult } from 'graphql';
import { GraphQLError } from 'graphql';

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
export function areGraphQLErrors(obj: unknown): obj is readonly GraphQLError[] {
  return (
    Array.isArray(obj) &&
    obj.length > 0 &&
    // if one item in the array is a GraphQLError, we're good
    obj.some(isGraphQLError)
  );
}

/** @private */
export function isGraphQLError(obj: unknown): obj is GraphQLError {
  return obj instanceof GraphQLError;
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
