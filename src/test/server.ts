/**
 *
 * test/server
 *
 */

import { assert, audit, Audit, AuditResult } from './common';

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
      'MUST',
      'accept application/graphql-response+json and match the content-type',
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
      'MUST',
      'accept application/json and match the content-type',
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
      'MUST',
      'accept */* and use application/graphql-response+json for the content-type',
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
      'MUST',
      'assume application/graphql-response+json content-type when accept is missing',
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
    audit('MUST', 'use utf-8 charset in response', async () => {
      const url = new URL(opts.url);
      url.searchParams.set('query', '{ __typename }');

      const res = await fetchFn(url.toString());
      assert(res.status).toBe(200);
      assert(res.headers.get('content-type')).toContain('charset=utf-8');
    }),
    audit('MUST', 'accept only utf-8 charset', async () => {
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
  ];
}

export async function testServer(
  opts: ServerAuditOptions,
): Promise<AuditResult[]> {
  const audits = serverAudits(opts);

  // audit tests will throw only on fatal errors, tests are contained within the AuditResult
  return await Promise.all(audits.map(({ fn }) => fn()));
}
