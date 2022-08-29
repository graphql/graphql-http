/**
 *
 * audit/server
 *
 */

import type { ExecutionResult } from 'graphql';
import { assert, audit, Audit, AuditResult } from './common';
import { extendedTypeof } from '../utils';

export interface ServerAuditOptions {
  /**
   * The URL of the GraphQL server for the audit.
   */
  url: string;
  /**
   * The Fetch function to use.
   *
   * For NodeJS environments consider using [`@whatwg-node/fetch`](https://github.com/ardatan/whatwg-node/tree/master/packages/fetch).
   *
   * @default global.fetch
   */
  fetchFn?: unknown;
}

export function serverAudits(opts: ServerAuditOptions): Audit[] {
  const fetchFn = (opts.fetchFn || fetch) as typeof fetch;
  return [
    // Media Types
    audit(
      'MUST accept application/graphql-response+json and match the content-type',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString(), {
          headers: {
            accept: 'application/graphql-response+json',
          },
        });
        assert(res.status).toBe(200);
        assert(res.headers.get('content-type')).toContain(
          'application/graphql-response+json',
        );
      },
    ),
    audit(
      'MUST accept application/json and match the content-type',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString(), {
          headers: {
            accept: 'application/json',
          },
        });
        assert(res.status).toBe(200);
        assert(res.headers.get('content-type')).toContain('application/json');
      },
    ),
    audit(
      'MUST accept */* and use application/graphql-response+json for the content-type',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString(), {
          headers: {
            accept: '*/*',
          },
        });
        assert(res.status).toBe(200);
        assert(res.headers.get('content-type')).toContain(
          'application/graphql-response+json',
        );
      },
    ),
    audit(
      'MUST assume application/graphql-response+json content-type when accept is missing',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert(res.status).toBe(200);
        assert(res.headers.get('content-type')).toContain(
          'application/graphql-response+json',
        );
      },
    ),
    audit('MUST use utf-8 charset in response', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', '{ __typename }');

      const res = await fetchFn(url.toString());
      assert(res.status).toBe(200);
      assert(res.headers.get('content-type')).toContain('charset=utf-8');
    }),
    audit('MUST accept only utf-8 charset', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', '{ __typename }');

      const res = await fetchFn(url.toString(), {
        headers: {
          accept: 'application/graphql-response+json; charset=iso-8859-1',
        },
      });
      assert(res.status).toBe(406);
      assert(res.headers.get('accept')).toContain('charset=utf-8');
    }),
    // Request
    audit('MUST accept POST requests', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert(res.status).toBe(200);
    }),
    audit(
      'MAY accept application/x-www-form-urlencoded formatted GET requests',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert(res.status).toBe(200);
      },
    ),
    // Request GET
    audit('MUST NOT allow executing mutations on GET requests', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', 'mutation { __typename }');

      const res = await fetchFn(url.toString(), {
        headers: {
          accept: 'application/graphql-response+json',
        },
      });
      assert(res.status).toBe(405);
    }),
    // Request POST
    audit(
      'SHOULD respond with 4xx status code if content-type is not supplied on POST requests',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
        });
        assert(res.status).toBeGreaterThanOrEqual(400);
        assert(res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit('MUST accept application/json POST requests', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert(res.status).toBe(200);
    }),
    audit('MUST require a request body on POST', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      });
      assert(res.status).toBe(400);
    }),
    // Request Parameters
    audit('MUST require the {query} parameter', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql-response+json',
        },
        body: JSON.stringify({ notquery: '{ __typename }' }),
      });
      assert(res.status).toBe(400);
    }),
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        `MUST NOT allow ${extendedTypeof(invalid)} for the {query} parameter`,
        async () => {
          const res = await fetchFn(opts.url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/graphql-response+json',
            },
            body: JSON.stringify({
              query: invalid,
            }),
          });
          assert(res.status).toBe(400);
        },
      ),
    ),
    audit('MUST accept a string for the {query} parameter', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql-response+json',
        },
        body: JSON.stringify({
          query: '{ __typename }',
        }),
      });
      assert(res.status).toBe(200);
    }),
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        `MUST NOT allow ${extendedTypeof(
          invalid,
        )} for the {operationName} parameter`,
        async () => {
          const res = await fetchFn(opts.url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/graphql-response+json',
            },
            body: JSON.stringify({
              operationName: invalid,
              query: '{ __typename }',
            }),
          });
          assert(res.status).toBe(400);
        },
      ),
    ),
    audit(
      'MUST accept a string for the {operationName} parameter',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            operationName: 'Query',
            query: 'query Query { __typename }',
          }),
        });
        assert(res.status).toBe(200);
      },
    ),
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        `MUST NOT allow ${extendedTypeof(
          invalid,
        )} for the {variables} parameter`,
        async () => {
          const res = await fetchFn(opts.url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/graphql-response+json',
            },
            body: JSON.stringify({
              query: '{ __typename }',
              variables: invalid,
            }),
          });
          assert(res.status).toBe(400);
        },
      ),
    ),
    audit('MUST accept a map for the {variables} parameter', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql-response+json',
        },
        body: JSON.stringify({
          query: 'query Type($name: String!) { __type(name: $name) { name } }',
          variables: { name: 'sometype' },
        }),
      });
      assert(res.status).toBe(200);
      const result = (await res.json()) as ExecutionResult;
      assert(result).notToHaveProperty('errors');
    }),
    audit(
      'MUST accept a URL-encoded JSON string for the {variables} parameter in GETs',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set(
          'query',
          'query Type($name: String!) { __type(name: $name) { name } }',
        );
        url.searchParams.set('variables', JSON.stringify({ name: 'sometype' }));
        const res = await fetchFn(url.toString(), {
          method: 'GET',
        });
        assert(res.status).toBe(200);
        const result = (await res.json()) as ExecutionResult;
        assert(result).notToHaveProperty('errors');
      },
    ),
    ...['string', 0, false, ['array']].map((invalid) =>
      audit('MUST NOT allow `%j` for the {extensions} parameter', async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{ __typename }',
            extensions: invalid,
          }),
        });
        assert(res.status).toBe(400);
      }),
    ),
    audit('MUST accept a map for the {extensions} parameter', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/graphql-response+json',
        },
        body: JSON.stringify({
          query: '{ __typename }',
          extensions: { some: 'value' },
        }),
      });
      assert(res.status).toBe(200);
    }),
    // TODO: audit('MUST accept a map for the {extensions} parameter'),
    // Response application/json
    audit(
      'SHOULD use 200 status code on JSON parsing failure when accepting application/json',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: '{ "not a JSON',
        });
        assert(res.status).toBe(200);
      },
    ),
    audit(
      'SHOULD use 200 status code if parameters are invalid when accepting application/json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('qeury' /* typo */, '{ __typename }');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        assert(res.status).toBe(200);
      },
    ),
    audit(
      'SHOULD use 200 status code on document parsing failure when accepting application/json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        assert(res.status).toBe(200);
      },
    ),
    audit(
      'SHOULD use 200 status code on document validation failure when accepting application/json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        assert(res.status).toBe(200);
      },
    ),
    // Response application/graphql-response+json
    audit(
      'MUST use 4xx or 5xx status codes on JSON parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: '{ "not a JSON',
        });
        assert(res.status).toBeGreaterThanOrEqual(400);
        assert(res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit(
      'SHOULD use 400 status code on JSON parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: '{ "not a JSON',
        });
        assert(res.status).toBe(400);
      },
    ),
    audit(
      'MUST use 4xx or 5xx status codes if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('qeury' /* typo */, '{ __typename }');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBeGreaterThanOrEqual(400);
        assert(res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit(
      'SHOULD use 400 status code if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('qeury' /* typo */, '{ __typename }');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBe(400);
      },
    ),
    audit(
      'MUST use 4xx or 5xx status codes on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBeGreaterThanOrEqual(400);
        assert(res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit(
      'SHOULD use 400 status code on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBe(400);
      },
    ),
    audit(
      'MUST use 4xx or 5xx status codes on document validation failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBeGreaterThanOrEqual(400);
        assert(res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit(
      'SHOULD use 400 status code on document validation failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(res.status).toBe(400);
      },
    ),
    // TODO: how to make an unauthorized request?
    // https://graphql.github.io/graphql-over-http/draft/#sel-EANNNDTAAEVBAAqqc
    // audit('SHOULD use 401 or 403 status codes when the request is not permitted')
  ];
}

export async function auditServer(
  opts: ServerAuditOptions,
): Promise<AuditResult[]> {
  const audits = serverAudits(opts);

  // audit tests will throw only on fatal errors, tests are contained within the AuditResult
  return await Promise.all(audits.map(({ fn }) => fn()));
}
