/**
 *
 * common
 *
 */

import { isObject } from './utils';

/**
 * TODO: document
 *
 * @category Common
 */
export interface Headers {
  accept?: string | undefined;
  allow?: string | undefined;
  'content-type'?: string | undefined;
  [key: string]: string | undefined;
}

/**
 * TODO: document
 *
 * @category Common
 */
export interface Request<RawRequest> {
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  readonly body: string | Record<string, unknown> | null;
  readonly req: RawRequest;
}

/**
 * Parameters for GraphQL's request for execution.
 *
 * Reference: https://graphql.github.io/graphql-over-http/draft/#sec-Request-Parameters
 *
 * @category Common
 */
export interface RequestParams {
  operationName?: string | undefined;
  query: string;
  variables?: Record<string, unknown> | undefined;
  extensions?: Record<string, unknown> | undefined;
}

/**
 * TODO: document
 *
 * @category Common
 */
export type ResponseBody = string;

/**
 * TODO: document
 *
 * @category Common
 */
export interface ResponseInit {
  readonly status: number;
  readonly statusText?: string;
  readonly headers?: Headers;
}

/**
 * TODO: document
 *
 * @category Common
 */
export type Response = readonly [body: ResponseBody | null, init: ResponseInit];

/**
 * TODO: document
 *
 * @category Common
 */
export function isResponse(val: unknown): val is Response {
  // TODO: make sure the contents of init match ResponseInit
  return Array.isArray(val) && typeof val[0] === 'string' && isObject(val[1]);
}

/**
 * A representation of any set of values over any amount of time.
 *
 * @category Common
 */
export interface Sink<T = unknown> {
  /** Next value arriving. */
  next(value: T): void;
  /** An error that has occured. This function "closes" the sink. */
  error(error: unknown): void;
  /** The sink has completed. This function "closes" the sink. */
  complete(): void;
}
