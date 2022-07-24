import { createHandler, HandlerOptions } from '../../handler';
import http from 'http';
import net from 'net';
import { Request } from '../../common';

type Dispose = () => Promise<void>;

// distinct server for each test; if you forget to dispose, the fixture wont
const leftovers: Dispose[] = [];
afterEach(async () => {
  while (leftovers.length > 0) {
    // if not disposed by test, cleanup
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dispose = leftovers.pop()!;
    await dispose();
  }
});

export function startTServer(
  options: HandlerOptions<http.IncomingMessage>,
): [url: string, dispose: Dispose] {
  const handle = createHandler(options);
  return startDisposableServer(
    http.createServer(async (req, res) => {
      try {
        const [body, init] = await handle(await incomingMessageToRequest(req));
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

  server.listen(0);

  const { port } = server.address() as net.AddressInfo;
  const url = `http://localhost:${port}`;

  return [url, dispose];
}

/** Converts the node http incoming message to a graphql-http request.  */
export async function incomingMessageToRequest(
  req: http.IncomingMessage,
): Promise<Request<http.IncomingMessage>> {
  if (!req.url) {
    throw new Error('Missing request URL');
  }
  if (!req.method) {
    throw new Error('Missing request method');
  }
  return {
    url: req.url,
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: await new Promise<string>((resolve) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => resolve(body));
    }),
    raw: req,
  };
}
