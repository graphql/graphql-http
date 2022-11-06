import { fetch } from '@whatwg-node/fetch';
import http from 'http';
import express from 'express';
import fastify from 'fastify';
import { createServerAdapter } from '@whatwg-node/server';
import { startDisposableServer } from './utils/tserver';
import { serverAudits } from '../audits';
import { schema } from './fixtures/simple';

import { createHandler as createNodeHandler } from '../use/node';
import { createHandler as createExpressHandler } from '../use/express';
import { createHandler as createFastifyHandler } from '../use/fastify';
import { createHandler as createFetchHandler } from '../use/fetch';

describe('node', () => {
  const [url, dispose] = startDisposableServer(
    http.createServer(createNodeHandler({ schema })),
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
});

describe('express', () => {
  const app = express();
  app.all('/', createExpressHandler({ schema }));

  const [url, dispose] = startDisposableServer(app.listen(0));
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }
});

describe('fastify', () => {
  const app = fastify();
  app.all('/', createFastifyHandler({ schema }));

  // call ready since we're not calling listen
  app.ready();

  const [url, dispose] = startDisposableServer(app.server);
  afterAll(dispose);

  for (const audit of serverAudits({ url, fetchFn: fetch })) {
    it(audit.name, async () => {
      const result = await audit.fn();
      if (result.status !== 'ok') {
        throw result.reason;
      }
    });
  }
});

describe('fetch', () => {
  const [url, dispose] = startDisposableServer(
    http.createServer(
      createServerAdapter({
        handleRequest: createFetchHandler({ schema }),
      }),
    ),
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
});
