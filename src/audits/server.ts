/**
 *
 * audit/server
 *
 */

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
   *
   * A function can be also supplied, in this case -
   * every audit will invoke the function to get the URL.
   */
  url: string | Promise<string> | (() => string | Promise<string>);
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
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({ query: '{ __typename }' }),
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
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ query: '{ __typename }' }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/json');
      },
    ),
    audit(
      'SHOULD accept */* and use application/json for the content-type',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: '*/*',
          },
          body: JSON.stringify({ query: '{ __typename }' }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/json');
      },
    ),
    audit(
      'SHOULD assume application/json content-type when accept is missing',
      async () => {
        const url = new URL(await getUrl(opts.url));
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert('Status code', res.status).toBe(200);
        assert(
          'Content-Type header',
          res.headers.get('content-type'),
        ).toContain('application/json');
      },
    ),
    audit('MUST use utf-8 encoding when responding', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
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
    audit('MUST accept utf-8 encoding', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ query: '{ __typename }' }),
      });

      assert('Status code', res.status).toBe(200);
      assert('Content-Type header', res.headers.get('content-type')).toContain(
        'utf-8',
      );
    }),
    audit('MUST assume utf-8 if encoding is unspecified', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ query: '{ __typename }' }),
      });

      assert('Status code', res.status).toBe(200);
      assert('Content-Type header', res.headers.get('content-type')).toContain(
        'utf-8',
      );
    }),
    // Request
    audit('MUST accept POST requests', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert('Status code', res.status).toBe(200);
    }),
    audit(
      'MAY accept application/x-www-form-urlencoded formatted GET requests',
      async () => {
        const url = new URL(await getUrl(opts.url));
        url.searchParams.set('query', '{ __typename }');

        const res = await fetchFn(url.toString());
        assert('Status code', res.status).toBe(200);
      },
    ),
    // Request GET
    // TODO: this is a MUST if the server supports GET requests
    audit('MAY NOT allow executing mutations on GET requests', async () => {
      const url = new URL(await getUrl(opts.url));
      url.searchParams.set('query', 'mutation { __typename }');

      const res = await fetchFn(url.toString(), {
        headers: {
          accept: 'application/graphql-response+json',
        },
      });
      assert('Status code', res.status).toBeBetween(400, 499);
    }),
    // Request POST
    audit(
      'SHOULD respond with 4xx status code if content-type is not supplied on POST requests',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
        });
        assert('Status code', res.status).toBeBetween(400, 499);
      },
    ),
    audit('MUST accept application/json POST requests', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
      });
      assert('Status code', res.status).toBe(200);
    }),
    audit('MUST require a request body on POST', async () => {
      const res = await fetchFn(await getUrl(opts.url), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      });
      if (res.headers.get('content-type')?.includes('application/json')) {
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).toHaveProperty('errors');
      } else {
        assert('Status code', res.status).toBe(400);
      }
    }),
    // Request Parameters
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD use 400 status code on missing {query} parameter when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({ notquery: '{ __typename }' }),
        });
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD use 200 status code with errors field on missing {query} parameter when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ notquery: '{ __typename }' }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).toHaveProperty('errors');
      },
    ),
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        // TODO: convert to MUST after watershed
        `SHOULD use 400 status code on ${extendedTypeof(
          invalid,
        )} {query} parameter when accepting application/graphql-response+json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
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
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        `SHOULD use 200 status code with errors field on ${extendedTypeof(
          invalid,
        )} {query} parameter when accepting application/json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              query: invalid,
            }),
          });
          assert('Status code', res.status).toBe(200);
          assert(
            'Execution result',
            await assertBodyAsExecutionResult(res),
          ).toHaveProperty('errors');
        },
      ),
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD allow string {query} parameter when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
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
      },
    ),
    audit(
      'MUST allow string {query} parameter when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            query: '{ __typename }',
          }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).notToHaveProperty('errors');
      },
    ),
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        // TODO: convert to MUST after watershed
        `SHOULD use 400 status code on ${extendedTypeof(
          invalid,
        )} {operationName} parameter when accepting application/graphql-response+json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
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
    ...[{ obj: 'ect' }, 0, false, ['array']].map((invalid) =>
      audit(
        `SHOULD use 200 status code with errors field on ${extendedTypeof(
          invalid,
        )} {operationName} parameter when accepting application/json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              operationName: invalid,
              query: '{ __typename }',
            }),
          });
          assert('Status code', res.status).toBe(200);
          assert(
            'Execution result',
            await assertBodyAsExecutionResult(res),
          ).toHaveProperty('errors');
        },
      ),
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD allow string {operationName} parameter when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
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
    audit(
      'MUST allow string {operationName} parameter when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            operationName: 'Query',
            query: 'query Query { __typename }',
          }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).notToHaveProperty('errors');
      },
    ),
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        // TODO: convert to MUST after watershed
        `SHOULD use 400 status code on ${extendedTypeof(
          invalid,
        )} {variables} parameter when accepting application/graphql-response+json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
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
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        `SHOULD use 200 status code with errors field on ${extendedTypeof(
          invalid,
        )} {variables} parameter when accepting application/json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              query: '{ __typename }',
              variables: invalid,
            }),
          });
          assert('Status code', res.status).toBe(200);
          assert(
            'Execution result',
            await assertBodyAsExecutionResult(res),
          ).toHaveProperty('errors');
        },
      ),
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD allow map {variables} parameter when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query:
              'query Type($name: String!) { __type(name: $name) { name } }',
            variables: { name: 'sometype' },
          }),
        });
        assert('Status code', res.status).toBe(200);
      },
    ),
    audit(
      'MUST allow map {variables} parameter when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            query:
              'query Type($name: String!) { __type(name: $name) { name } }',
            variables: { name: 'sometype' },
          }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).notToHaveProperty('errors');
      },
    ),
    audit(
      'MAY allow URL-encoded JSON string {variables} parameter in GETs when accepting application/graphql-response+json',
      async () => {
        const url = new URL(await getUrl(opts.url));
        url.searchParams.set(
          'query',
          'query Type($name: String!) { __type(name: $name) { name } }',
        );
        url.searchParams.set('variables', JSON.stringify({ name: 'sometype' }));
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: {
            accept: 'application/graphql-response+json',
          },
        });
        assert('Status code', res.status).toBe(200);
      },
    ),
    audit(
      'MAY allow URL-encoded JSON string {variables} parameter in GETs when accepting application/json',
      async () => {
        const url = new URL(await getUrl(opts.url));
        url.searchParams.set(
          'query',
          'query Type($name: String!) { __type(name: $name) { name } }',
        );
        url.searchParams.set('variables', JSON.stringify({ name: 'sometype' }));
        const res = await fetchFn(url.toString(), {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).notToHaveProperty('errors');
      },
    ),
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        // TODO: convert to MUST after watershed
        `SHOULD use 400 status code on ${extendedTypeof(
          invalid,
        )} {extensions} parameter when accepting application/graphql-response+json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
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
    ...['string', 0, false, ['array']].map((invalid) =>
      audit(
        `SHOULD use 200 status code with errors field on ${extendedTypeof(
          invalid,
        )} {extensions} parameter when accepting application/json`,
        async () => {
          const res = await fetchFn(await getUrl(opts.url), {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            body: JSON.stringify({
              query: '{ __typename }',
              extensions: invalid,
            }),
          });
          assert('Status code', res.status).toBe(200);
          assert(
            'Execution result',
            await assertBodyAsExecutionResult(res),
          ).toHaveProperty('errors');
        },
      ),
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD allow map {extensions} parameter when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
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
      },
    ),
    audit(
      'MUST allow map {extensions} parameter when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            query: '{ __typename }',
            extensions: { some: 'value' },
          }),
        });
        assert('Status code', res.status).toBe(200);
        assert(
          'Execution result',
          await assertBodyAsExecutionResult(res),
        ).notToHaveProperty('errors');
      },
    ),
    // TODO: audit('MUST accept a map for the {extensions} parameter'),
    // Response application/json
    audit(
      'SHOULD use 200 status code on JSON parsing failure when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
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
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            qeury: /* typo */ '{ __typename }',
          }),
        });
        assert('Status code', res.status).toBe(200);
      },
    ),
    audit(
      'SHOULD use 200 status code on document parsing failure when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ query: '{' }),
        });
        assert('Status code', res.status).toBe(200);
      },
    ),
    audit(
      'SHOULD use 200 status code on document validation failure when accepting application/json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            query: '{ 8f31403dfe404bccbb0e835f2629c6a7 }', // making sure the field doesnt exist
          }),
        });
        assert('Status code', res.status).toBe(200);
      },
    ),
    // Response application/graphql-response+json
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD use 4xx or 5xx status codes on JSON parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: '{ "not a JSON',
        });
        assert('Status code', res.status).toBeBetween(400, 499);
      },
    ),
    audit(
      'SHOULD use 400 status code on JSON parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
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
        const res = await fetchFn(await getUrl(opts.url), {
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
      // TODO: convert to MUST after watershed
      'SHOULD use 4xx or 5xx status codes if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            qeury /* typo */: '{ __typename }',
          }),
        });
        assert('Status code', res.status).toBeBetween(400, 599);
      },
    ),
    audit(
      'SHOULD use 400 status code if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            qeury: /* typo */ '{ __typename }',
          }),
        });
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry if parameters are invalid when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            qeury: /* typo */ '{ __typename }',
          }),
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
      },
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD use 4xx or 5xx status codes on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{',
          }),
        });
        assert('Status code', res.status).toBeBetween(400, 599);
      },
    ),
    audit(
      'SHOULD use 400 status code on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{',
          }),
        });
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry on document parsing failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{',
          }),
        });
        assert(
          'Data entry',
          (await assertBodyAsExecutionResult(res)).data,
        ).toBe(undefined);
      },
    ),
    audit(
      // TODO: convert to MUST after watershed
      'SHOULD use 4xx or 5xx status codes on document validation failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{ 8f31403dfe404bccbb0e835f2629c6a7 }', // making sure the field doesnt exist
          }),
        });
        assert('Status code', res.status).toBeBetween(400, 599);
      },
    ),
    audit(
      'SHOULD use 400 status code on document validation failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{ 8f31403dfe404bccbb0e835f2629c6a7 }', // making sure the field doesnt exist
          }),
        });
        assert('Status code', res.status).toBe(400);
      },
    ),
    audit(
      'SHOULD not contain the data entry on document validation failure when accepting application/graphql-response+json',
      async () => {
        const res = await fetchFn(await getUrl(opts.url), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/graphql-response+json',
          },
          body: JSON.stringify({
            query: '{ 8f31403dfe404bccbb0e835f2629c6a7 }', // making sure the field doesnt exist
          }),
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

/** @private */
async function getUrl(
  url: string | Promise<string> | (() => string | Promise<string>),
): Promise<string> {
  if (typeof url === 'function') {
    return await url();
  }
  return url;
}
