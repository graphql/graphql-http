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

import fetch from 'node-fetch';
import { auditServer } from '../lib/audits/server.mjs';

async function main() {
  const serverUrl = new URL(`http://localhost:${process.env.PORT}/graphql`);

  let total = 0;
  const results = {
    ok: [],
    warn: [],
    error: [],
  };
  for (const result of await auditServer({
    url: serverUrl.toString(),
    fetchFn: fetch,
  })) {
    total++;
    results[result.status].push(result);
  }

  console.log(`${results.ok.length} audits are passing.`);
  for (const result of results.ok) {
    console.log(`\t✅ ${result.name}`);
  }

  console.log();
  console.log(
    `${results.warn.length} audits are warnings. The server SHOULD support these, but is not required. `,
  );
  for (const result of results.warn) {
    console.log(`\t${'⚠️'} ${result.name}`);
    console.log(`\t\t💬 ${result.reason}`);
  }

  console.log();
  console.log(
    `${results.error.length} audits are errors. The server MUST support these. `,
  );
  for (const result of results.error) {
    console.log(`\t❌ ${result.name}`);
    console.log(`\t\t💬 ${result.reason}`);
  }

  console.log();
  console.log(
    `Out of ${total} audits, ${results.ok.length} passed, ${results.warn.length} are warnings and ${results.error.length} are errors.`,
  );

  // if any of the MUST audits fail, fail the process too
  if (results.error.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
