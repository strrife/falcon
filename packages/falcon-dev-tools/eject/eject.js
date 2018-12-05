#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const chalk = require('chalk');
const babel = require('@babel/core');
const recast = require('recast');
const prettier = require('prettier');
const install = require('install-packages');

const prettierOptions = {
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  parser: 'babylon',
  endOfLine: 'lf'
};

const pluginRecast = () => ({
  parserOverride(code, opts, parser) {
    return recast.parse(code, {
      ...opts,
      parser: {
        parse: source => parser(source, Object.assign({}, opts, { tokens: true }))
      }
    });
  },
  generatorOverride(ast, opts) {
    return recast.print(ast, opts);
  }
});

const onTsFiles = item => {
  const ext = path.extname(item.path);

  if (ext && ext !== '.ts' && ext !== '.tsx') return false;

  return true;
};

const onlyAppJsFiles = targetDir => item => {
  const ext = path.extname(item.path);

  if (ext && ext !== '.js') return false;

  return item.path.indexOf(targetDir) === -1;
};

const skipTypeDefinitionsFiles = src => !src.endsWith('d.ts');

const bold = text => chalk.blue.underline.bold(text);

const normalizeNewLines = src => src.replace(/\r?\n|\r/g, '\n');

async function run() {
  const packageToEject = process.argv[2];
  const targetDir = process.argv[3];
  const targetDirFullPath = path.join(process.cwd(), targetDir);
  const appSrc = path.join(process.cwd(), 'src');
  const resolvedPackageDir = path.dirname(require.resolve(packageToEject));
  const resolvedPackagePackageJsonPath = path.join(resolvedPackageDir, '../package.json');
  // eslint-disable-next-line
  const resolvedPackagePackageJsonDependencies = require(resolvedPackagePackageJsonPath).dependencies;

  console.log(chalk.green(`Ejecting ${bold(packageToEject)} package into ${bold(targetDirFullPath)} ...`));

  const packageSrcFiles = path.join(resolvedPackageDir, '../src');

  if (fs.pathExistsSync(targetDirFullPath)) {
    console.log(
      chalk.red(`Looks like ${bold(packageToEject)} has been already ejected, ${bold(targetDir)} dir already exists.`)
    );
    process.exit(-1);

    return;
  }

  // copy source typescript files to target dir
  await fs.copy(packageSrcFiles, targetDirFullPath, { filter: skipTypeDefinitionsFiles });

  const ejectedFilesMeta = klawSync(targetDirFullPath, { nodir: true, filter: onTsFiles });

  // one files are copied transform each of, them removing TS types
  // while preserving original formatting and rename to .js extension

  for (let i = 0; i < ejectedFilesMeta.length; i++) {
    const filePath = ejectedFilesMeta[i].path;
    // eslint-disable-next-line
    let fileContents = await fs.readFile(filePath, 'utf8');
    // babel transforms Typescript to JS using recast to preserver as much original formatting as possible
    const result = babel.transformSync(fileContents, {
      plugins: [['@babel/plugin-transform-typescript', { isTSX: true }], pluginRecast]
    });

    // run prettier on transformed JS as recast preserves formatting such as whitespaces, but formats bit diferently thant prettier
    const transformedContents = prettier.format(result.code, prettierOptions);
    // write transformed code to file
    // eslint-disable-next-line
    await fs.writeFile(filePath, normalizeNewLines(transformedContents), 'utf8');
    // and rename file to .js extension
    const targetPathJs = filePath.replace(path.extname(filePath), '.js');
    // eslint-disable-next-line
    await fs.move(filePath, targetPathJs);
  }

  // replace imports inside project src
  const appFilesMeta = klawSync(appSrc, { nodir: true, filter: onlyAppJsFiles(targetDir) });

  for (let i = 0; i < appFilesMeta.length; i++) {
    const filePath = appFilesMeta[i].path;
    // eslint-disable-next-line
    const fileContents = await fs.readFile(filePath, 'utf8');
    // run babel transforms that preserve formatting while replacing imports
    const result = babel.transformSync(fileContents, {
      plugins: [
        '@babel/plugin-syntax-jsx',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-class-properties',
        ['babel-plugin-transform-rename-import', { original: packageToEject, replacement: targetDir }],
        pluginRecast
      ]
    });

    const transformedContents = prettier.format(result.code, prettierOptions);

    // eslint-disable-next-line
    await fs.writeFile(filePath, normalizeNewLines(transformedContents), 'utf8');
  }
  const dependenciesToInstall = Object.keys(resolvedPackagePackageJsonDependencies).map(
    packageName => `${packageName}@${resolvedPackagePackageJsonDependencies[packageName]}`
  );
  console.log(
    chalk.green(`${bold(packageToEject)} package dependencies in project...\n${dependenciesToInstall.join('\n')}`)
  );

  await install({
    packages: Object.keys(resolvedPackagePackageJsonDependencies),
    peerFilter: () => false
  });

  console.log(chalk.green(`${bold(packageToEject)} package ejected!`));
}

run();
