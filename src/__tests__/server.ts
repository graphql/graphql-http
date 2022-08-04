import fetch from 'node-fetch';

import { schema } from './fixtures/simple';
import { bodyAsExecResult, startTServer, TServer } from './utils/tserver';

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

  it('must use utf-8 charset in response', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('charset=utf-8');
  });

  it('must accept only utf-8 charset', async () => {
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

describe('Request', () => {
  it('must accept POST requests', async () => {
    const res = await fetch(server.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    });
    expect(res.status).toBe(200);
  });

  it('may accept application/x-www-form-urlencoded formatted GET requests', async () => {
    const url = new URL(server.url);
    url.searchParams.set('query', '{ __typename }');

    const res = await fetch(url.toString());
    expect(res.status).toBe(200);
  });

  describe('GET', () => {
    it('must not allow executing mutations', async () => {
      const url = new URL(server.url);
      url.searchParams.set(
        'query',
        'mutation { f10d019f15804f92a7c7470205c866da }', // making sure the field doesnt exist
      );

      const res = await fetch(url.toString(), {
        headers: {
          accept: 'application/graphql+json',
        },
      });
      expect(res.status).toBe(405);
    });
  });

  describe('POST', () => {
    it('should respond with 4xx status code if content-type is not supplied', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.status).toBeLessThanOrEqual(599);
    });

    it('must accept application/json requests', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      expect(res.status).toBe(200);
    });

    it('must require a request body', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      });
      expect(res.status).toBe(400);
    });
  });

  describe('Request Parameters', () => {
    it('must require the {query} parameter', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
        body: JSON.stringify({ notquery: '{ __typename }' }),
      });
      expect(res.status).toBe(400);
    });
    it.each([{ obj: 'ect' }, 0, false, ['array']])(
      'must not allow `%j` for the {query} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql+json',
          },
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
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
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
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql+json',
          },
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
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
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
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql+json',
          },
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
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
        body: JSON.stringify({
          query: 'query Type($name: String!) { __type(name: $name) { name } }',
          variables: { name: 'sometype' },
        }),
      });
      expect(res.status).toBe(200);
      const result = await bodyAsExecResult(res);
      expect(result).not.toHaveProperty('errors');
    });
    it('must accept a URL-encoded JSON string for the {variable} parameter in GETs', async () => {
      const url = new URL(server.url);
      url.searchParams.set(
        'query',
        'query Type($name: String!) { __type(name: $name) { name } }',
      );
      url.searchParams.set('variables', JSON.stringify({ name: 'sometype' }));
      const res = await fetch(url.toString(), {
        method: 'GET',
      });
      expect(res.status).toBe(200);
      const result = await bodyAsExecResult(res);
      expect(result).not.toHaveProperty('errors');
    });

    it.each(['string', 0, false, ['array']])(
      'must not allow `%j` for the {extensions} parameter',
      async (invalid) => {
        const res = await fetch(server.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql+json',
          },
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
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
        body: JSON.stringify({
          query: '{ __typename }',
          extensions: { some: 'value' },
        }),
      });
      expect(res.status).toBe(200);
    });
    it.todo(
      'must accept a URL-encoded JSON string for the {extensions} parameter in GETs',
    );
  });
});

describe('Response', () => {
  describe('application/json', () => {
    it('should use 200 status code on JSON parsing failure', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: '{ "not a JSON',
      });
      expect(res.status).toBe(200);
    });

    it('should use 200 status code if parameters are invalid', async () => {
      const url = new URL(server.url);
      url.searchParams.set('qeury' /* typo */, '{ __typename }');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json' },
      });
      expect(res.status).toBe(200);
    });

    it('should use 200 status code on document parsing failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json' },
      });
      expect(res.status).toBe(200);
    });

    it('should use 200 status code on document validation failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json' },
      });
      expect(res.status).toBe(200);
    });
  });

  describe('application/graphql+json', () => {
    it('must use 4xx or 5xx status codes on JSON parsing failure', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
        body: '{ "not a JSON',
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.status).toBeLessThanOrEqual(599);
    });
    it('should use 400 status code on JSON parsing failure', async () => {
      const res = await fetch(server.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql+json',
        },
        body: '{ "not a JSON',
      });
      expect(res.status).toBe(400);
    });

    it('must use 4xx or 5xx status codes if parameters are invalid', async () => {
      const url = new URL(server.url);
      url.searchParams.set('qeury' /* typo */, '{ __typename }');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.status).toBeLessThanOrEqual(599);
    });
    it('should use 400 status code if parameters are invalid', async () => {
      const url = new URL(server.url);
      url.searchParams.set('qeury' /* typo */, '{ __typename }');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBe(400);
    });

    it('must use 4xx or 5xx status codes on document parsing failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.status).toBeLessThanOrEqual(599);
    });
    it('should use 400 status code on document parsing failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{');
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBe(400);
    });

    it('must use 4xx or 5xx status codes on document validation failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.status).toBeLessThanOrEqual(599);
    });
    it('should use 400 status code on document validation failure', async () => {
      const url = new URL(server.url);
      url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/graphql+json' },
      });
      expect(res.status).toBe(400);
    });

    // TODO: how to make an unauthorized request?
    // https://graphql.github.io/graphql-over-http/draft/#sel-EANNNDTAAEVBAAqqc
    it.todo(
      'should use 401 or 403 status codes when the request is not permitted',
    );
  });
});
