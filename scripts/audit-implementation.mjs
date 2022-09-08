// @ts-check

/**
 *
 * Tests a running local server for GraphQL over HTTP compliance.
 *
 * Optionally creates a report in markdown given the {reportPath} argument.
 *
 * Usage example from root of project:
 *
 * ```sh
 * yarn build:esm
 * PORT=4000 node scripts/audit-implementation.mjs {reportPath}
 * ```
 *
 * Note that graphql-http has to be built before running this script!
 *
 */

import os from 'os';
import fetch from 'node-fetch';
import fs from 'fs/promises';
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

  // write report if path specified
  const reportPath = process.argv[2];
  if (reportPath) {
    await fs.writeFile(reportPath, report);
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
  /**
   * @type {{ total: number, ok: AuditOk[], warn: AuditFail[], error: AuditFail[] }}
   */
  const grouped = {
    total: 0,
    ok: [],
    warn: [],
    error: [],
  };
  for (const result of results) {
    grouped.total++;

    // trick for TS
    if (result.status === 'ok') {
      grouped[result.status].push(result);
    } else {
      grouped[result.status].push(result);
    }
  }

  let report = '';

  report += `# GraphQL over HTTP audit\n`;
  report += '\n';

  report += `- **${grouped.total}** audits in total\n`;
  report += `- **${grouped.ok.length}** pass\n`;
  report += `- **${grouped.warn.length}** warnings (optional)\n`;
  report += `- **${grouped.error.length}** errors (required)\n`;
  report += `\n`;

  report += `## Passing\n`;
  for (const [i, result] of grouped.ok.entries()) {
    report += `${i + 1}. ✅ ${result.name}\n`;
  }
  report += '\n';

  report += `## Warnings\n`;
  report += `The server _SHOULD_ support these, but is not required.\n`;
  for (const [i, result] of grouped.warn.entries()) {
    report += `${i + 1}. ${'⚠️'} ${result.name}<br />\n`;
    report += `  💬 ${result.reason}\n`;
  }
  report += '\n';

  report += `## Errors\n`;
  report += `The server _MUST_ support these.\n`;
  for (const [i, result] of grouped.error.entries()) {
    report += `${i + 1}. ❌ ${result.name}<br />\n`;
    report += `  💬 ${result.reason}\n`;
  }

  return {
    summary: `${grouped.ok.length} audits pass out of ${grouped.total} (${grouped.warn.length} warnings, ${grouped.error.length} errors)`,
    report,
    counts: {
      total: grouped.total,
      ok: grouped.ok.length,
      warn: grouped.warn.length,
      error: grouped.error.length,
    },
  };
}
