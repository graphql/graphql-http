/**
 *
 * common
 *
 */

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
