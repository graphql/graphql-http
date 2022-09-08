// @ts-check

/**
 *
 * Tests a running local server for GraphQL over HTTP compliance.
 *
 * Usage example from root of project:
 *
 * ```sh
 * yarn build:esm
 * PORT=4000 node scripts/audit-implementation.mjs
 * ```
 *
 * Note that graphql-http has to be built before running this script!
 *
 */

import os from 'os';
import fetch from 'node-fetch';
import { auditServer } from '../lib/index.mjs';

/**
 * @typedef { import("../src/audits").AuditResult } AuditResult
 * @typedef { import("../src/audits").AuditOk } AuditOk
 * @typedef { import("../src/audits").AuditFail } AuditFail
 */

async function main() {
  const serverUrl = new URL(`http://localhost:${process.env.PORT}/graphql`);

  const results = await auditServer({
    url: serverUrl.toString(),
    fetchFn: fetch,
  });
  const { summary, report, counts } = await createReport(results);

  console.log(report);

  if (counts.error) {
    // only warn because auditing _did_ suceed. failing jobs is reserved for errors that couldn't even run the audit
    process.stdout.write(
      `::warning::Implementation does not comply with the GraphQL over HTTP spec. ${summary}${os.EOL}`,
    );
  } else if (counts.warn) {
    process.stdout.write(
      `::notice::Implementation complies with the GraphQL over HTTP spec, but does not pass all optional audits. ${summary}${os.EOL}`,
    );
  } else {
    process.stdout.write(
      `::notice::Implementation is fully compliant with the GraphQL over HTTP spec!${os.EOL}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * @param {AuditResult[]} results
 */
async function createReport(results) {
  let report = '';

  let total = 0;

  /**
   * @type {{ ok: AuditOk[], warn: AuditFail[], error: AuditFail[] }}
   */
  const sorted = {
    ok: [],
    warn: [],
    error: [],
  };
  for (const result of results) {
    total++;

    // trick for ts
    if (result.status === 'ok') {
      sorted[result.status].push(result);
    } else {
      sorted[result.status].push(result);
    }
  }

  report += `### ${sorted.ok.length} audits are passing.\n`;
  for (const result of sorted.ok) {
    report += `- ✅ ${result.name}\n`;
  }
  report += '\n';

  report += `### ${sorted.warn.length} audits are warnings. The server SHOULD support these, but is not required.\n`;
  for (const result of sorted.warn) {
    report += `- ${'⚠️'} ${result.name}\n`;
    report += `  - 💬 ${result.reason}\n`;
  }
  report += '\n';

  report += `### ${sorted.error.length} audits are errors. The server MUST support these.\n`;
  for (const result of sorted.error) {
    report += `- ❌ ${result.name}\n`;
    report += `  - 💬 ${result.reason}\n`;
  }
  report += '\n';

  const summary = `${sorted.ok.length} audits passed out of ${total}. ${sorted.warn.length} are warnings (optional) and ${sorted.error.length} are errors (required).`;
  report += summary;

  return {
    summary,
    report,
    counts: {
      total,
      ok: sorted.ok.length,
      warn: sorted.warn.length,
      error: sorted.error.length,
    },
  };
}
