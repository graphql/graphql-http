import fetch from 'node-fetch';

import { schema } from './fixtures/simple';
import { startTServer, TServer } from './utils/tserver';

let server!: TServer;
beforeAll(() => {
  server = startTServer({ schema });
});

describe('Media Types', () => {
  it('must accept application/graphql+json and match the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/graphql+json',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain(
      'application/graphql+json',
    );
  });

  it('must accept application/json and match the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/json',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/json');
  });

  it('must accept */* and use application/graphql+json for the content-type', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: '*/*',
      },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain(
      'application/graphql+json',
    );
  });

  it('must assume application/graphql+json content-type when accept is missing', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain(
      'application/graphql+json',
    );
  });

  it('must use utf-8 charset when encoding info is not specified', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('charset=utf-8');
  });

  it('must allow exlusively utf-8 encoding', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/graphql+json; charset=iso-8859-1',
      },
    });
    expect(res.status).toBe(406);
    expect(res.headers.get('accept')).toContain('charset=utf-8');
  });
});
