/**
 *
 * Tests a running local server for GraphQL over HTTP compliance.
 *
 * Optionally creates reports in Markdown and JSON given to the [reportsDir] argument.
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
import { auditServer } from '../lib/index.mjs';

/**
 * @typedef { import("../src/audits").AuditResult } AuditResult
 * @typedef { import("../src/audits").AuditOk } AuditOk
 * @typedef { import("../src/audits").AuditFail } AuditFail
 */

async function main() {
  const serverUrl = new URL(
    process.env.URL || `http://localhost:${process.env.PORT}/graphql`,
  );

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

  let report = '_* This report was auto-generated by graphql-http_\n';
  report += '\n';

  report += `# GraphQL over HTTP audit report\n`;
  report += '\n';

  report += `- **${grouped.total}** audits in total\n`;
  if (grouped.ok.length) {
    report += `- ✅ **${grouped.ok.length}** pass\n`;
  }
  if (grouped.warn.length) {
    report += `- ${'⚠️'} **${grouped.warn.length}** warnings (optional)\n`;
  }
  if (grouped.error.length) {
    report += `- ❌ **${grouped.error.length}** errors (required)\n`;
  }
  report += `\n`;

  if (grouped.ok.length) {
    report += `## Passing\n`;
    for (const [i, result] of grouped.ok.entries()) {
      report += `${i + 1}. ${escapeMarkdown(result.name)}\n`;
    }
    report += '\n';
  }

  /**
   * @param {AuditFail} result
   * @param {string} indent
   */
  async function printAuditFail(result, indent) {
    let report = '';
    report += indent + '<details>\n';
    report += indent + `<summary>${truncate(result.reason)}</summary>\n`;
    report += indent + '\n';
    report += indent + '```json\n';
    const res = result.response;
    /** @type {Record<string, string>} */
    const headers = {};
    for (const [key, val] of res.headers.entries()) {
      headers[key] = val;
    }
    let text, json;
    try {
      text = await res.text();
      json = JSON.parse(text);
    } catch {
      // noop
    }
    const stringified = JSON.stringify(
      {
        status: res.status,
        statusText: res.statusText,
        headers,
        body: json || text,
      },
      null,
      2,
    );
    for (const line of stringified.split('\n')) {
      report += indent + line + '\n';
    }
    report += indent + '```\n';
    report += indent + '</details>\n';
    report += indent + '\n';
    return report;
  }

  if (grouped.warn.length) {
    report += `## Warnings\n`;
    report += `The server _SHOULD_ support these, but is not required.\n\n`;
    for (const [i, result] of grouped.warn.entries()) {
      report += `${i + 1}. ${escapeMarkdown(result.name)}<br />\n\n`;
      report += await printAuditFail(result, '    ');
    }
    report += '\n';
  }

  if (grouped.error.length) {
    report += `## Errors\n`;
    report += `The server _MUST_ support these.\n\n`;
    for (const [i, result] of grouped.error.entries()) {
      report += `${i + 1}. ${escapeMarkdown(result.name)}<br />\n\n`;
      report += await printAuditFail(result, '    ');
    }
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

/**
 * @param {string} str
 */
function escapeMarkdown(str) {
  return str.replace(/\*/g, '\\*');
}

/**
 * @param {string} str
 * @param {number} [len=1024]
 */
function truncate(str, len = 1024) {
  if (str.length > len) {
    return str.substring(0, len) + '...';
  }
  return str;
}
