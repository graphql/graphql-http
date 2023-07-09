import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fetch } from '@whatwg-node/fetch';
import http from 'http';
import express from 'express';
import fastify from 'fastify';
import Koa from 'koa';
import mount from 'koa-mount';
import uWS from 'uWebSockets.js';
import { startDisposableServer } from './utils/tserver';
import { serverAudits } from '../src/audits';
import { schema } from './fixtures/simple';

import { createHandler as createHttpHandler } from '../src/use/http';
import { createHandler as createExpressHandler } from '../src/use/express';
import { createHandler as createFastifyHandler } from '../src/use/fastify';
import { createHandler as createFetchHandler } from '../src/use/fetch';
import { createHandler as createKoaHandler } from '../src/use/koa';
import { createHandler as createUWSHandler } from '../src/use/uWebSockets';

describe('http', () => {
  const [url, , dispose] = startDisposableServer(
    http.createServer(createHttpHandler({ schema })),
  );
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }

  it('should allow manipulating the response from the request context', async () => {
    const [url, , dispose] = startDisposableServer(
      http.createServer(
        createHttpHandler({
          schema,
          context(req) {
            req.context.res.setHeader('x-test', 'test-x');
            return undefined;
          },
        }),
      ),
    );

    const res = await fetch(url + '?query={hello}');

    await expect(res.text()).resolves.toMatchInlineSnapshot(
      '"{\\"data\\":{\\"hello\\":\\"world\\"}}"',
    );
    expect(res.headers.get('x-test')).toBe('test-x');

    await dispose();
  });
});

describe('http2', () => {
  it.todo('should pass all server audits');
  it.todo('should allow manipulating the response from the request context');
});

describe('express', () => {
  const app = express();
  app.all('/', createExpressHandler({ schema }));

  const [url, , dispose] = startDisposableServer(app.listen(0));
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }

  it('should allow manipulating the response from the request context', async () => {
    const app = express();
    app.all(
      '/',
      createExpressHandler({
        schema,
        context(req) {
          req.context.res.setHeader('x-test', 'test-x');
          return undefined;
        },
      }),
    );

    const [url, , dispose] = startDisposableServer(app.listen(0));

    const res = await fetch(url + '?query={hello}');

    await expect(res.text()).resolves.toMatchInlineSnapshot(
      '"{\\"data\\":{\\"hello\\":\\"world\\"}}"',
    );
    expect(res.headers.get('x-test')).toBe('test-x');

    await dispose();
  });
});

describe('fastify', () => {
  const app = fastify();

  // otherwise will throw error code 400 when json data is malformed
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    function (_, data, done) {
      done(null, String(data));
    },
  );

  app.all('/', createFastifyHandler({ schema }));

  // call ready since we're not calling listen
  app.ready();

  const [url, , dispose] = startDisposableServer(app.server);
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }

  it('should allow manipulating the response from the request context', async () => {
    const app = fastify();

    app.all(
      '/',
      createFastifyHandler({
        schema,
        context(req) {
          req.context.reply.header('x-test', 'test-x');
          return undefined;
        },
      }),
    );

    // call ready since we're not calling listen
    app.ready();

    const [url, , dispose] = startDisposableServer(app.server);

    const res = await fetch(url + '?query={hello}');

    await expect(res.text()).resolves.toMatchInlineSnapshot(
      '"{\\"data\\":{\\"hello\\":\\"world\\"}}"',
    );
    expect(res.headers.get('x-test')).toBe('test-x');

    await dispose();
  });
});

describe('fetch', () => {
  const handler = createFetchHandler({ schema });

  for (const audit of serverAudits({
    url: 'http://localhost',
    fetchFn: (input: any, init: any) => handler(new Request(input, init)),
  })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }
});

describe('koa', () => {
  const app = new Koa();
  app.use(mount('/', createKoaHandler({ schema })));

  const [url, , dispose] = startDisposableServer(app.listen(0));
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }

  it('should allow manipulating the response from the request context', async () => {
    const app = new Koa();
    app.use(
      mount(
        '/',
        createKoaHandler({
          schema,
          context(req) {
            req.context.res.set('x-test', 'test-x');
            return undefined;
          },
        }),
      ),
    );

    const [url, , dispose] = startDisposableServer(app.listen(0));

    const res = await fetch(url + '?query={hello}');

    await expect(res.text()).resolves.toMatchInlineSnapshot(
      '"{\\"data\\":{\\"hello\\":\\"world\\"}}"',
    );
    expect(res.headers.get('x-test')).toBe('test-x');

    await dispose();
  });
});

describe('uWebSockets.js', () => {
  let url = '';
  let appListenSocket: uWS.us_listen_socket;
  beforeAll(async () => {
    // get available port by starting a temporary server
    const [availableUrl, availablePort, dispose] = startDisposableServer(
      http.createServer(),
    );
    await dispose();
    url = availableUrl;

    new Promise<void>((resolve, reject) => {
      uWS
        .App()
        .any('/', createUWSHandler({ schema }))
        .listen(availablePort, (listenSocket) => {
          if (!listenSocket) {
            reject(new Error('Unavailable uWS listen socket'));
          } else {
            appListenSocket = listenSocket;
            resolve();
          }
        });
    });
  });

  afterAll(() => uWS.us_listen_socket_close(appListenSocket));

  for (const audit of serverAudits({ url: () => url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }
});
