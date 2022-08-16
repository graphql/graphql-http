/**
 *
 * client
 *
 */

import type { ExecutionResult } from 'graphql';
import { RequestParams, Sink } from './common';
import { isObject } from './utils';

/** This file is the entry point for browsers, re-export common elements. */
export * from './common';

/** @category Client */
export interface ClientOptions {
  /**
   * URL of the GraphQL over HTTP server to connect.
   *
   * If the option is a function, it will be called on each request.
   * Returning a Promise is supported too and the request will stall until it
   * resolves.
   *
   * A good use-case for having a function is when using the URL for authentication,
   * where subsequent requests (due to auth) may have a refreshed identity token.
   *
   * Function receives the request params. Useful for example, to ease up debugging and DevTools
   * navigation you might want to use the operation name in the URL's search params (`/graphql?MyQuery`).
   */
  url: string | ((request: RequestParams) => Promise<string> | string);
  /**
   * Indicates whether the user agent should send cookies from the other domain in the case
   * of cross-origin requests.
   *
   * Possible options are:
   *   - `omit`: Never send or receive cookies.
   *   - `same-origin`: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script.
   *   - `include`: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
   *
   * @default same-origin
   */
  credentials?: 'omit' | 'same-origin' | 'include';
  /**
   * A string specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string.
   *
   * @default undefined
   */
  referrer?: string;
  /**
   * Specifies the referrer policy to use for the request.
   *
   * Possible options are:
   *   - `no-referrer`: Does not send referrer information along with requests to any origin.
   *   - `no-referrer-when-downgrade`: Sends full referrerURL for requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL.
   *   - `same-origin`: Sends full referrerURL as referrer information when making same-origin-referrer requests.
   *   - `origin`: Sends only the ASCII serialization of the request’s referrerURL when making both same-origin-referrer requests and cross-origin-referrer requests.
   *   - `strict-origin`: Sends the ASCII serialization of the origin of the referrerURL for requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL
   *   - `origin-when-cross-origin`: Sends full referrerURL when making same-origin-referrer requests, and only the ASCII serialization of the origin of the request’s referrerURL is sent when making cross-origin-referrer requests
   *   - `strict-origin-when-cross-origin`: Sends full referrerURL when making same-origin-referrer requests, and only the ASCII serialization of the origin of the request’s referrerURL when making cross-origin-referrer requests: whose referrerURL and current URL are both potentially trustworthy URLs, or whose referrerURL is a non-potentially trustworthy URL.
   *   - `unsafe-url`: Sends full referrerURL along for both same-origin-referrer requests and cross-origin-referrer requests.
   *
   * @default undefined
   */
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'same-origin'
    | 'origin'
    | 'strict-origin'
    | 'origin-when-cross-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';
  /**
   * HTTP headers to pass along the request.
   *
   * If the option is a function, it will be called on each request.
   * Returning a Promise is supported too and the request will stall until it
   * resolves.
   *
   * A good use-case for having a function is when using the URL for authentication,
   * where subsequent requests (due to auth) may have a refreshed identity token.
   */
  headers?:
    | Record<string, string>
    | (() =>
        | Promise<Record<string, string> | null | void>
        | Record<string, string>
        | null
        | void);
  /**
   * Control whether the network request error should be retried.
   *
   * Please note that you can **only** control network errors, all other
   * errors are considered fatal and will be reported immediately.
   *
   * You may implement your own waiting strategy by timing the resolution of the returned promise.
   *
   * Useful for retrying requests that failed because the service is temporarely unavailable.
   *
   * `retries` argument counts actual retries, so it will begin with
   * 0 after the first failed request.
   *
   * Returning `false` will report the `err` argument; however, throwing a different error from
   * the `err` argument, will report it instead.
   *
   * @default '() => false'
   */
  shouldRetry?: (err: NetworkError, retries: number) => Promise<boolean>;
  /**
   * The Fetch function to use.
   *
   * For NodeJS environments consider using [`node-fetch`](https://github.com/node-fetch/node-fetch).
   *
   * @default global.fetch
   */
  fetchFn?: unknown;
  /**
   * The AbortController implementation to use.
   *
   * For NodeJS environments before v15 consider using [`node-abort-controller`](https://github.com/southpolesteve/node-abort-controller).
   *
   * @default global.AbortController
   */
  abortControllerImpl?: unknown;
}

/** @category Client */
export interface Client {
  /**
   * Subscribes to receive a response by making an HTTP request.
   *
   * It uses the `sink` to emit the received data or errors. Returns a _dispose_
   * function used for canceling active requests and cleaning up.
   */
  subscribe<Data = Record<string, unknown>, Extensions = unknown>(
    request: RequestParams,
    sink: Sink<ExecutionResult<Data, Extensions>>,
  ): () => void;
  /**
   * Dispose of the client, cancel all active requests and clean up resources.
   */
  dispose: () => void;
}

/**
 * Creates a disposable GraphQL over HTTP client to transmit
 * GraphQL operation results.
 *
 * @category Client
 */
export function createClient(options: ClientOptions): Client {
  const {
    credentials = 'same-origin',
    referrer,
    referrerPolicy,
    shouldRetry = () => false,
  } = options;

  const fetchFn = (options.fetchFn || fetch) as typeof fetch;
  const AbortControllerImpl = (options.abortControllerImpl ||
    AbortController) as typeof AbortController;

  // we dont use yet another AbortController here because of
  // node's max EventEmitters listeners being only 10
  const client = (() => {
    let disposed = false;
    const listeners: (() => void)[] = [];
    return {
      get disposed() {
        return disposed;
      },
      onDispose(cb: () => void) {
        if (disposed) {
          // empty the call stack and then call the cb
          setTimeout(() => cb(), 0);
          return () => {
            // noop
          };
        }
        listeners.push(cb);
        return () => {
          listeners.splice(listeners.indexOf(cb), 1);
        };
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        // we copy the listeners so that onDispose unlistens dont "pull the rug under our feet"
        for (const listener of [...listeners]) {
          listener();
        }
      },
    };
  })();

  return {
    subscribe(request, sink) {
      if (client.disposed) throw new Error('Client has been disposed');

      const control = new AbortControllerImpl();
      const unlisten = client.onDispose(() => {
        unlisten();
        control.abort();
      });

      (async () => {
        let retryingErr: NetworkError | null = null,
          retries = 0;
        for (;;) {
          if (retryingErr) {
            const should = await shouldRetry(retryingErr, retries);

            // requst might've been canceled while waiting for retry
            if (control.signal.aborted) return;

            if (!should) throw retryingErr;

            retries++;
          }

          try {
            const url =
              typeof options.url === 'function'
                ? await options.url(request)
                : options.url;
            if (control.signal.aborted) return;

            const headers =
              typeof options.headers === 'function'
                ? await options.headers()
                : options.headers ?? {};
            if (control.signal.aborted) return;

            let res;
            try {
              res = await fetchFn(url, {
                signal: control.signal,
                method: 'POST',
                headers: {
                  ...headers,
                  'content-type': 'application/json; charset=utf-8',
                  accept: 'application/graphql-response+json, application/json',
                },
                credentials,
                referrer,
                referrerPolicy,
                body: JSON.stringify(request),
              });
            } catch (err) {
              throw new NetworkError(err);
            }
            if (!res.ok) throw new NetworkError(res);
            if (!res.body) throw new Error('Missing response body');

            const contentType = res.headers.get('content-type');
            if (!contentType) throw new Error('Missing response content-type');
            if (
              !contentType.includes('application/graphql-response+json') &&
              !contentType.includes('application/json')
            ) {
              throw new Error(
                `Unsupported response content-type ${contentType}`,
              );
            }

            const result = await res.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sink.next(result as any);

            return control.abort();
          } catch (err) {
            if (control.signal.aborted) return;

            // all non-network errors are worth reporting immediately
            if (!(err instanceof NetworkError)) throw err;

            // try again
            retryingErr = err;
          }
        }
      })()
        .then(() => sink.complete())
        .catch((err) => sink.error(err));

      return () => control.abort();
    },
    dispose() {
      client.dispose();
    },
  };
}

/**
 * A network error caused by the client or an unexpected response from the server.
 *
 * To avoid bundling DOM typings (because the client can run in Node env too),
 * you should supply the `Response` generic depending on your Fetch implementation.
 *
 * @category Client
 */
export class NetworkError<
  Response extends ResponseLike = ResponseLike,
> extends Error {
  /**
   * The underlyig response thats considered an error.
   *
   * Will be undefined when no response is received,
   * instead an unexpected network error.
   */
  public response: Response | undefined;

  constructor(msgOrErrOrResponse: string | Error | Response) {
    let message, response: Response | undefined;
    if (isResponseLike(msgOrErrOrResponse)) {
      response = msgOrErrOrResponse;
      message =
        'Server responded with ' +
        msgOrErrOrResponse.status +
        ': ' +
        msgOrErrOrResponse.statusText;
    } else if (msgOrErrOrResponse instanceof Error)
      message = msgOrErrOrResponse.message;
    else message = String(msgOrErrOrResponse);

    super(message);

    this.name = this.constructor.name;
    this.response = response;
  }
}

/**
 * Concrete interface a response needs to implement for the client.
 *
 * @category Client
 */
export interface ResponseLike {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
}

function isResponseLike(val: unknown): val is ResponseLike {
  return (
    isObject(val) &&
    typeof val['ok'] === 'boolean' &&
    typeof val['status'] === 'number' &&
    typeof val['statusText'] === 'string'
  );
}
