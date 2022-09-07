/**
 *
 * audit/server
 *
 */

import type { ExecutionResult } from 'graphql';
import { Audit, AuditResult } from './common';
import {
  assert,
  assertBodyAsExecutionResult,
  audit,
  extendedTypeof,
} from './utils';

/**
 * Options for server audits required to check GraphQL over HTTP spec conformance.
 *
 * @category Audits
 */
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

/**
 * List of server audits required to check GraphQL over HTTP spec conformance.
 *
 * @category Audits
 */
export function serverAudits(opts: ServerAuditOptions): Audit[] {
  const fetchFn = (opts.fetchFn || fetch) as typeof fetch;
  return [
    // Media Types
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD accept application/graphql-response+json and match the content-type',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString(), {
          headers: {
            accept: 'application/graphql-response+json',
          },
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/graphql-response+json');
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
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/json');
      },
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD accept */* and use application/graphql-response+json for the content-type',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString(), {
          headers: {
            accept: '*/*',
          },
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/graphql-response+json');
      },
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD assume application/graphql-response+json content-type when accept is missing',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/graphql-response+json');
      },
    ),
    audit('MUST use utf-8 encoding when responding', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', '{ __typename }');

      const res = await fetchFn(url.toString());
      assert('Status code', res.status).toBe(200);

      // has charset set to utf-8
      try {
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('charset=utf-8');
        return;
      } catch {
        // noop, continue
      }

      // has no charset specified
      assert(
        'Content-Type header',
        res.headers.get('content-type'),
      ).notToContain('charset');

      // and the content is utf-8 encoded
      try {
        const decoder = new TextDecoder('utf-8');
        const decoded = decoder.decode(await res.arrayBuffer());
        assert('UTF-8 decoded body', decoded).toBe(
          '{"data":{"__typename":"Query"}}',
        );
      } catch {
        throw 'Body is not UTF-8 encoded';
      }
    }),
    audit('MUST accept only utf-8 charset', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', '{ __typename }');

      const res = await fetchFn(url.toString(), {
        headers: {
          accept: 'application/graphql-response+json; charset=iso-8859-1',
        },
      });

      // application/json is 200 + errors
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        assert(`Content-Type ${contentType} status code`, res.status).toBe(200);

        assert(
          'Body data errors',
          (await assertBodyAsExecutionResult(res)).errors,
        ).toBeDefined();
        return;
      }

      // other content-types must be 4xx
      assert(
        `Content-Type ${contentType} status code`,
        res.status,
      ).toBeGreaterThanOrEqual(400);
      assert(
        `Content-Type ${contentType} status code`,
        res.status,
      ).toBeLessThanOrEqual(499);
    }),
    // Request
    audit('MUST accept POST requests', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert('Status code', res.status).toBe(200);
    }),
    audit(
      'MAY accept application/x-www-form-urlencoded formatted GET requests',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert('Status code', res.status).toBe(200);
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
      assert('Status code', res.status).toBe(405);
    }),
    // Request POST
    audit(
      'SHOULD respond with 4xx status code if content-type is not supplied on POST requests',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
        });
        assert('Status code', res.status).toBeGreaterThanOrEqual(400);
        assert('Status code', res.status).toBeLessThanOrEqual(599);
      },
    ),
    audit('MUST accept application/json POST requests', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert('Status code', res.status).toBe(200);
    }),
    audit('MUST require a request body on POST', async () => {
      const res = await fetchFn(opts.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      });
      assert('Status code', res.status).toBe(400);
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
      assert('Status code', res.status).toBe(400);
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
          assert('Status code', res.status).toBe(400);
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
      assert('Status code', res.status).toBe(200);
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
          assert('Status code', res.status).toBe(400);
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
        assert('Status code', res.status).toBe(200);
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
          assert('Status code', res.status).toBe(400);
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
      assert('Status code', res.status).toBe(200);
      const result = (await assertBodyAsExecutionResult(
        res,
      )) as ExecutionResult;
      assert('Execution result', result).notToHaveProperty('errors');
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
        assert('Status code', res.status).toBe(200);
        const result = await assertBodyAsExecutionResult(res);
        assert('Execution result', result).notToHaveProperty('errors');
      },
    ),
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        `MUST NOT allow ${extendedTypeof(
          invalid,
        )} for the {extensions} parameter`,
        async () => {
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
          assert('Status code', res.status).toBe(400);
        },
      ),
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
      assert('Status code', res.status).toBe(200);
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
        assert('Status code', res.status).toBe(200);
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
        assert('Status code', res.status).toBe(200);
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
        assert('Status code', res.status).toBe(200);
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
        assert('Status code', res.status).toBe(200);
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
        assert('Status code', res.status).toBeGreaterThanOrEqual(400);
        assert('Status code', res.status).toBeLessThanOrEqual(599);
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
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry on JSON parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(opts.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: '{ "not a JSON',
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
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
        assert('Status code', res.status).toBeGreaterThanOrEqual(400);
        assert('Status code', res.status).toBeLessThanOrEqual(599);
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
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('qeury' /* typo */, '{ __typename }');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
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
        assert('Status code', res.status).toBeGreaterThanOrEqual(400);
        assert('Status code', res.status).toBeLessThanOrEqual(599);
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
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{');
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
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
        assert('Status code', res.status).toBeGreaterThanOrEqual(400);
        assert('Status code', res.status).toBeLessThanOrEqual(599);
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
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry on document validation failure when accepting application/graphql-response+json',
      async () => {
        const url = new URL(opts.url);
        url.searchParams.set('query', '{ 8f31403dfe404bccbb0e835f2629c6a7 }'); // making sure the field doesnt exist
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: { accept: 'application/graphql-response+json' },
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
      },
    ),
    // TODO: how to fail and have the data entry?
    // audit('MUST use 2xx status code if response contains the data entry and it is not null when accepting application/graphql-response+json'),
    // TODO: how to make an unauthorized request?
    // https://graphql.github.io/graphql-over-http/draft/#sel-EANNNDTAAEVBAAqqc
    // audit('SHOULD use 401 or 403 status codes when the request is not permitted')
  ];
}

/**
 * Performs the full list of server audits required for GraphQL over HTTP spec conformance.
 *
 * Please consult the `AuditResult` for more information.
 *
 * @category Audits
 */
export async function auditServer(
  opts: ServerAuditOptions,
): Promise<AuditResult[]> {
  const audits = serverAudits(opts);

  // audit tests will throw only on fatal errors, tests are contained within the AuditResult
  return await Promise.all(audits.map(({ fn }) => fn()));
}
