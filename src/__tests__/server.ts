import fetch from 'node-fetch';

import { schema } from './fixtures/simple';
import { startTServer, TServer } from './utils/tserver';

let server!: TServer;
beforeAll(() => {
  server = startTServer({ schema });
});

describe('Media Types', () => {
  it('should accept application/graphql+json and match the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/graphql+json',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'application/graphql+json; charset=utf-8',
    );
  });

  it('should accept application/json and match the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/json',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'application/json; charset=utf-8',
    );
  });

  it('should accept */* and use application/graphql+json for the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: '*/*',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'application/graphql+json; charset=utf-8',
    );
  });

  it('should assume application/graphql+json content-type when accept is missing', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe(
      'application/graphql+json; charset=utf-8',
    );
  });
});
