#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const transformImports = require('transform-imports');

const TARGET_UI_COMPONENTS_DIR = 'uikit';

const FilterOnlyAppJsFiles = item => {
  const ext = path.extname(item.path);

  if (ext && ext !== '.js') return false;

  return item.path.indexOf(TARGET_UI_COMPONENTS_DIR) === -1;
};
(async () => {
  // uikit javascript source files location
  const jsSrc = path.dirname(require.resolve('@deity/falcon-ecommerce-uikit/dist/js-src'));
  const appSrc = path.join(process.cwd(), 'src');
  const targetDir = path.join(appSrc, TARGET_UI_COMPONENTS_DIR);

  if (fs.pathExistsSync(targetDir)) {
    console.error('@deity/falcon-ecommerce-uikit already ejected!');
    process.exit(-1);

    return;
  }

  await fs.copy(jsSrc, targetDir);
  const filesMeta = klawSync(appSrc, { nodir: true, filter: FilterOnlyAppJsFiles });
  for (let i = 0; i < filesMeta.length; i++) {
    const filePath = filesMeta[i].path;
    // eslint-disable-next-line
    const fileContents = await fs.readFile(filePath);

    let newCode = transformImports(fileContents, importDefs => {
      importDefs.forEach(importDef => {
        if (importDef.source === '@deity/falcon-ecommerce-uikit') {
          importDef.source = 'src/uikit';
        }
      });
    });
    newCode = newCode.replace(/\r?\n|\r/g, '\n');
    if (!newCode.endsWith('\n')) {
      newCode += '\n';
    }

    // eslint-disable-next-line
    await fs.writeFile(filePath, newCode);
  }

  console.log('@deity/falcon-ecommerce-uikit package ejected successfully');
})();
// TODO: write pros and cons of this approach
// TODO: preserve imports in single line - https://github.com/suchipi/transform-imports/issues/3
// TODO: move pages from example to uikit? so async whole pages are defined in uikit
// TODO: improve babel transpilation from TS to JS  (build:jsSrc) (read prettier config?)
// TODO: change uikit target dir to components?
// TODO: do not use enums in uikit? - problems with compilation
// TODO: do not use grid areas ASCII art - formatting not preserved currently
// TODO: separate uikit components from mutations/queries - separate packages?
