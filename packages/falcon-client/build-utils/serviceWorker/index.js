const Logger = require('@deity/falcon-logger');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const re = require('rollup-plugin-re');
const alias = require('rollup-plugin-alias');
const paths = require('./../paths');
const { getManifestEntries } = require('./workbox');
const { formatBytes } = require('../webpack/tools');

module.exports.build = async () => {
  Logger.info('Compiling Service Worker...');

  const isProductionBuild = process.env.NODE_ENV === 'production';
  const input = fs.existsSync(paths.appSwJs) ? paths.appSwJs : paths.ownSwJs;

  try {
    const { manifestEntries, size } = await getManifestEntries();

    const inputOptions = {
      input,
      plugins: [
        alias({ 'app-path': paths.appPath }),
        resolve(),
        re({
          patterns: [
            {
              test: 'const ENTRIES = [];',
              replace: `const ENTRIES = ${JSON.stringify(manifestEntries, null, 2)};`
            }
          ]
        })
      ].map(x => x)
    };

    const outputOptions = {
      file: path.join(paths.appPath, path.join('build', 'public', 'sw.js')),
      format: 'iife',
      sourcemap: !isProductionBuild,
      compact: isProductionBuild
    };

    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);

    Logger.info(`pre-caching ${manifestEntries.length} files, totaling ${formatBytes(size)}.`);
    Logger.info('Service Worker compiled.\n');
  } catch (error) {
    Logger.error(chalk.red(`Failed to compile Service Worker\n${input}`));
    Logger.error(error);
    Logger.info();

    process.exit(1);
  }
};
