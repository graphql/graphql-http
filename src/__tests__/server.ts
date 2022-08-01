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
});

describe('Request', () => {
  it('must accept POST requests', async () => {
    const res = await fetch(server.url, {
      method: 'POST',
      body: JSON.stringify({ query: '{ __typename }' }),
    });
    expect(res.status).toBe(200);
  });

  it('may accept GET requests', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
  });

  describe('Request Parameters', () => {
    it('must require the {query} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        body: JSON.stringify({ notquery: '{ __typename }' }),
      });
      expect(res.status).toBe(400);
    });
    it.each([{ obj: 'ect' }, 0, false, ['array']])(
      'must not allow `%j` for the {query} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          body: JSON.stringify({
            query: invalid,
          }),
        });
        expect(res.status).toBe(400);
      },
    );
    it('must accept a string for the {query} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        body: JSON.stringify({
          query: '{ __typename }',
        }),
      });
      expect(res.status).toBe(200);
    });

    it.each([{ obj: 'ect' }, 0, false, ['array']])(
      'must not allow `%j` for the {operationName} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          body: JSON.stringify({
            operationName: invalid,
            query: '{ __typename }',
          }),
        });
        expect(res.status).toBe(400);
      },
    );
    it('must accept a string for the {operationName} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        body: JSON.stringify({
          operationName: 'Query',
          query: 'query Query { __typename }',
        }),
      });
      expect(res.status).toBe(200);
    });

    it.each(['string', 0, false, ['array']])(
      'must not allow `%j` for the {variables} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          body: JSON.stringify({
            query: '{ __typename }',
            variables: invalid,
          }),
        });
        expect(res.status).toBe(400);
      },
    );
    it('must accept a map for the {variables} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        body: JSON.stringify({
          query: '{ __typename }',
          variables: { some: 'value' },
        }),
      });
      expect(res.status).toBe(200);
    });

    it.each(['string', 0, false, ['array']])(
      'must not allow `%j` for the {extensions} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          body: JSON.stringify({
            query: '{ __typename }',
            extensions: invalid,
          }),
        });
        expect(res.status).toBe(400);
      },
    );
    it('must accept a map for the {extensions} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        body: JSON.stringify({
          query: '{ __typename }',
          extensions: { some: 'value' },
        }),
      });
      expect(res.status).toBe(200);
    });
  });
});
