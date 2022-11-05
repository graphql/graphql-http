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
  const isProd = process.env.NODE_ENV === 'production';
  const api: FetchAPI = {
    Response: fetchApi.Response || Response,
    TextEncoder: fetchApi.TextEncoder || TextEncoder,
    ReadableStream: fetchApi.ReadableStream || ReadableStream,
  };
  const handler = createRawHandler(options);
  return async function handleRequest(req) {
    try {
      const [body, init] = await handler({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: () => req.text(),
        raw: req,
        context: api,
      });
      return new api.Response(body, init);
    } catch (err) {
      // The handler shouldnt throw errors.
      // If you wish to handle them differently, consider implementing your own request handler.
      console.error(
        'Internal error occurred during request handling. ' +
          'Please check your implementation.',
        err,
      );
      if (isProd) {
        return new api.Response(null, { status: 500 });
      } else {
        return new api.Response(
          JSON.stringify({
            errors: [
              err instanceof Error
                ? {
                    message: err.message,
                    stack: err.stack,
                  }
                : err,
            ],
          }),
          {
            status: 500,
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
          },
        );
      }
    }
  };
}
