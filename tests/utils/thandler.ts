import {
  createHandler,
  HandlerOptions,
  RequestHeaders,
  Response,
  Handler,
} from '../../src/handler';
import { RequestParams } from '../../src/common';
import { schema } from '../fixtures/simple';

export interface THandler {
  handler: Handler;
  request(
    method: 'GET',
    search: RequestParams,
    headers?: RequestHeaders,
  ): Promise<Response>;
  request(
    method: 'POST',
    body: RequestParams,
    headers?: RequestHeaders,
  ): Promise<Response>;
  fetch(
    input: globalThis.RequestInfo,
    init?: globalThis.RequestInit,
  ): Promise<globalThis.Response>;
}

export function createTHandler(opts: HandlerOptions): THandler {
  const handler = createHandler({ schema, ...opts });
  return {
    handler,
    request(method, params, headers = {}): Promise<Response> {
      const search = method === 'GET' ? new URLSearchParams() : null;
      if (params.operationName)
        search?.set('operationName', params.operationName);
      search?.set('query', params.query);
      if (params.variables)
        search?.set('variables', JSON.stringify(params.variables));
      if (params.extensions)
        search?.set('extensions', JSON.stringify(params.extensions));
      return handler({
        method,
        url: search
          ? `http://localhost?${search.toString()}`
          : 'http://localhost',
        headers: {
          accept: 'application/graphql-response+json',
          'content-type': search ? undefined : 'application/json',
          ...headers,
        },
        body: search ? null : JSON.stringify(params),
        raw: null,
        context: null,
      });
    },
    async fetch(input, init) {
      const req = new globalThis.Request(input, init);
      const res = await handler({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: () => req.text(),
        raw: req,
        context: null,
      });
      return new globalThis.Response(...res);
    },
  };
}
