import {
  createHandler as createRawHandler,
  HandlerOptions,
  OperationContext,
} from '../handler';

export interface FetchAPI {
  Response: typeof Response;
  ReadableStream: typeof ReadableStream;
  TextEncoder: typeof TextEncoder;
}

export function createHandler<Context extends OperationContext = undefined>(
  options: HandlerOptions<Request, FetchAPI, Context>,
  fetchApi: Partial<FetchAPI> = {},
): (req: Request) => Promise<Response> {
  const api: FetchAPI = {
    Response: fetchApi.Response || Response,
    TextEncoder: fetchApi.TextEncoder || TextEncoder,
    ReadableStream: fetchApi.ReadableStream || ReadableStream,
  };

  const handler = createRawHandler(options);
  return async function handleRequest(req) {
    const [body, init] = await handler({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: () => req.text(),
      raw: req,
      context: api,
    });
    return new api.Response(body, init);
  };
}
