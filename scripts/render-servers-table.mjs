import fs from 'fs/promises';
import path from 'path';

async function main() {
  const openMark = '<!-- <ServersTable> -->';
  const closeMark = '<!-- </ServersTable> -->';

  let table = `${openMark}\n`;
  table += await renderTable('implementations');
  table += '\n'; // prettier would the new line here
  table += `\n${closeMark}`;

  const readme = (await fs.readFile('README.md')).toString();

  await fs.writeFile(
    'README.md',
    readme.replace(new RegExp(`${openMark}.+?${closeMark}`, 's'), table),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/** @param {string} implsDir */
async function renderTable(implsDir) {
  let out = `<!-- prettier-ignore-start -->
| Name | Audit |
|------|-------|`;
  for (const implDir of (await fs.readdir(implsDir)).sort()) {
    /** @type {{ error: number }} */
    const report = JSON.parse(
      (
        await fs.readFile(path.join(implsDir, implDir, 'report.json'))
      ).toString(),
    );
    if (report.error > 0) {
      continue;
    }

    /** @type {Record<string, unknown>} */
    const pkg = JSON.parse(
      (
        await fs.readFile(path.join(implsDir, implDir, 'package.json'))
      ).toString(),
    );
    if (pkg.name === 'express-graphql') {
      // deprecated
      continue;
    }

    out += '\n';
    if (pkg.url) {
      out += `| [${pkg.name}](${pkg.url}) `;
    } else {
      out += `| ${pkg.name} `;
    }
    out += `| [✅ Compliant](/implementations/${implDir}/README.md) |`;
  }
  out += '\n<!-- prettier-ignore-end -->';
  return out;
}
