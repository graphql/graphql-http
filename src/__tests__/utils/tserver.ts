import { Request, createHandler, HandlerOptions } from '../../handler';
import http from 'http';
import net from 'net';
import { schema } from '../fixtures/simple';

type Dispose = () => Promise<void>;

const leftovers: Dispose[] = [];
afterAll(async () => {
  while (leftovers.length > 0) {
    await leftovers.pop()?.();
  }
});

export interface TServer {
  url: string;
  dispose: Dispose;
}
export function startTServer(
  options: HandlerOptions<http.IncomingMessage> & {
    changeRequest?: (
      req: Request<http.IncomingMessage, unknown>,
    ) => Request<http.IncomingMessage, unknown>;
  } = {},
): TServer {
  const { changeRequest = (req) => req, ...handlerOptions } = options;
  const handle = createHandler({
    schema,
    ...handlerOptions,
  });
  const [url, dispose] = startDisposableServer(
    http.createServer(async (req, res) => {
      try {
        if (!req.url) {
          throw new Error('Missing request URL');
        }
        if (!req.method) {
          throw new Error('Missing request method');
        }
        const [body, init] = await handle(
          changeRequest({
            url: req.url,
            method: req.method,
            headers: req.headers,
            body: () =>
              new Promise<string>((resolve) => {
                let body = '';
                req.on('data', (chunk) => (body += chunk));
                req.on('end', () => resolve(body));
              }),
            raw: req,
            context: null,
          }),
        );
        res.writeHead(init.status, init.statusText, init.headers).end(body);
      } catch (err) {
        if (err instanceof Error) {
          res.writeHead(500).end(err.message);
        } else {
          res
            .writeHead(500, { ContentType: 'application/json' })
            .end(JSON.stringify(err));
        }
      }
    }),
  );
  return {
    url,
    dispose,
  };
}

/**
 * Starts a disposable server thet is really stopped when the dispose func resolves.
 *
 * Additionally adds the server kill function to the post tests `leftovers`
 * to be invoked after each test.
 */
export function startDisposableServer(
  server: http.Server,
): [url: string, dispose: Dispose] {
  const sockets = new Set<net.Socket>();
  server.on('connection', (socket) => {
    sockets.add(socket);
    socket.once('close', () => sockets.delete(socket));
  });

  const dispose = async () => {
    for (const socket of sockets) {
      socket.destroy();
    }
    await new Promise<void>((resolve) => server.close(() => resolve()));
  };
  leftovers.push(dispose);

  if (!server.listening) {
    server.listen(0);
  }

  const { port } = server.address() as net.AddressInfo;
  const url = `http://localhost:${port}`;

  return [url, dispose];
}
