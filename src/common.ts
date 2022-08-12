/**
 *
 * common
 *
 */

import { isObject } from './utils';

/**
 * The incoming request headers the implementing server should provide.
 *
 * @category Common
 */
export interface RequestHeaders {
  accept?: string | undefined;
  allow?: string | undefined;
  'content-type'?: string | undefined;
  /**
   * Always an array in Node. Duplicates are added to it.
   * Not necessarily true for other environments, make sure
   * to check the type during runtime.
   */
  'set-cookie'?: string | string[] | undefined;
  [key: string]: string | string[] | undefined;
}

/**
 * Server agnostic request interface containing the raw request
 * which is server dependant.
 *
 * @category Common
 */
export interface Request<RawRequest, Context> {
  readonly method: string;
  readonly url: string;
  readonly headers: RequestHeaders;
  readonly body: string | Record<string, unknown> | null;
  /**
   * The raw request itself from the implementing server.
   *
   * For example: `express.Request` when using Express, or maybe
   * `http.IncomingMessage` when just using Node with `http.createServer`.
   */
  readonly raw: RawRequest;
  /**
   * Context value about the incoming request, you're free to pass any information here.
   */
  readonly context: Context;
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
 * The response headers that get returned from graphql-http.
 *
 * @category Common
 */
export type ResponseHeaders = {
  accept?: string;
  allow?: string;
  'content-type'?: string;
} & Record<string, string>;

/**
 * Server agnostic response body returned from `graphql-http` needing
 * to be coerced to the server implementation in use.
 *
 * @category Common
 */
export type ResponseBody = string;

/**
 * Server agnostic response options (ex. status and headers) returned from
 * `graphql-http` needing to be coerced to the server implementation in use.
 *
 * @category Common
 */
export interface ResponseInit {
  readonly status: number;
  readonly statusText: string;
  readonly headers?: ResponseHeaders;
}

/**
 * Server agnostic response returned from `graphql-http` containing the
 * body and init options needing to be coerced to the server implementation in use.
 *
 * @category Common
 */
export type Response = readonly [body: ResponseBody | null, init: ResponseInit];

/**
 * Checks whether the passed value is the `graphql-http` server agnostic response.
 *
 * @category Common
 */
export function isResponse(val: unknown): val is Response {
  // TODO: make sure the contents of init match ResponseInit
  return (
    Array.isArray(val) &&
    (typeof val[0] === 'string' || val[0] === null) &&
    isObject(val[1])
  );
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
