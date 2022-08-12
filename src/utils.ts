/**
 *
 * utils
 *
 */

import type { ExecutionResult, GraphQLError } from 'graphql';

/** @private */
export function isObject(val: unknown): val is Record<PropertyKey, unknown> {
  return typeof val === 'object' && val !== null;
}

/** @private */
export function areGraphQLErrors(obj: unknown): obj is readonly GraphQLError[] {
  return (
    Array.isArray(obj) &&
    // must be at least one error
    obj.length > 0 &&
    // error has at least a message
    obj.every((ob) => 'message' in ob)
  );
}

/** @private */
export function isExecutionResult(val: unknown): val is ExecutionResult {
  return (
    isObject(val) && ('data' in val || 'errors' in val || 'extensions' in val)
  );
}

/** @private */
export function isAsyncIterable<T = unknown>(
  val: unknown,
): val is AsyncIterable<T> {
  return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
