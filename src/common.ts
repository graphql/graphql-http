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
export type Headers = Record<string, string>;

/**
 * TODO: document
 *
 * @category Common
 */
export interface Request<RawRequest> {
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  readonly body: string | null;
  readonly raw: RawRequest;
}

/**
 * Parameters for GraphQL's request for execution.
 *
 * Reference: https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#request
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
