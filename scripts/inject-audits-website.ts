import fs from 'fs/promises';
import path from 'path';

async function main() {
  const openMark = '<!-- <graphql-http-audits.min.js> -->';
  const closeMark = '<!-- </graphql-http-audits.min.js> -->';

  const index = (
    await fs.readFile(path.join('website', 'index.html'))
  ).toString();
  const script = (
    await fs.readFile(path.join('umd', 'graphql-http-audits.min.js'))
  ).toString();

  await fs.writeFile(
    path.join('website', 'index.html'),
    index.replace(
      new RegExp(`${openMark}.+?${closeMark}`, 's'),
      // match the expected indentation in index.html
      `${openMark}
    <script>
      // prettier-ignore
      ${
        // last character is a new line, remove it
        script.slice(0, -1)
      }
    </script>
    ${closeMark}`,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
