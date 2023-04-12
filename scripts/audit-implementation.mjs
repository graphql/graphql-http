/**
 *
 * Tests a running local server for GraphQL over HTTP compliance.
 *
 * Optionally creates reports in Markdown (rendered in HTML) and JSON given to the [reportsDir] argument.
 *
 * Usage example from root of project:
 *
 * ```sh
 * yarn build:esm
 * PORT=4000 node scripts/audit-implementation.mjs [reportsDir]
 * ```
 *
 * Note that graphql-http has to be built before running this script!
 *
 */

import os from 'os';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { auditServer, renderAuditResultsToHTML } from '../lib/index.mjs';

async function main() {
  const serverUrl = new URL(
    process.env.URL || `http://localhost:${process.env.PORT}/graphql`,
  );

  const results = await auditServer({
    url: serverUrl.toString(),
    fetchFn: fetch,
  });

  const counts = {
    total: 0,
    ok: 0,
    notice: 0,
    warn: 0,
    error: 0,
  };
  for (const result of results) {
    counts.total++;
    if (result.status === 'ok') {
      counts.ok++;
    }
    if (result.status === 'notice') {
      counts.notice++;
    }
    if (result.status === 'warn') {
      counts.warn++;
    }
    if (result.status === 'error') {
      counts.error++;
    }
  }

  const summary = `${counts.ok} audits pass out of ${counts.total} (${counts.warn} warnings, ${counts.error} errors)`;
  const report = await renderAuditResultsToHTML(results);

  console.log(report);

  if (counts.error) {
    // only warn because auditing _did_ suceed. failing jobs is reserved for errors that couldn't even run the audit
    process.stdout.write(
      `::warning::Implementation does not comply with the GraphQL over HTTP spec. ${summary}${os.EOL}`,
    );
  } else if (counts.warn) {
    process.stdout.write(
      `::notice::Implementation is compliant with the GraphQL over HTTP spec, but some optional audits fail. ${summary}${os.EOL}`,
    );
  } else {
    process.stdout.write(
      `::notice::Implementation is fully compliant with the GraphQL over HTTP spec!${os.EOL}`,
    );
  }

  // write report if path specified
  const reportsDir = process.argv[2];
  if (reportsDir) {
    await fs.writeFile(path.join(reportsDir, 'README.md'), report);
    await fs.writeFile(
      path.join(reportsDir, 'report.json'),
      JSON.stringify(
        {
          ...counts,
          // TODO: more info, like what tests failed and so on
        },
        undefined,
        '  ',
      ) + '\n',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
