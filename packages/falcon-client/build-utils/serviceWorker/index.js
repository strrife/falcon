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

/**
 * @param {import('../webpack/tools').FalconSWBuildConfig} buildConfig
 */
module.exports.build = async buildConfig => {
  Logger.log('Compiling Service Worker...');

  const { NODE_ENV } = process.env;
  const IS_PROD = NODE_ENV === 'production';

  const input = fs.existsSync(paths.appSwJs) ? paths.appSwJs : paths.ownSwJs;

  try {
    const manifestEntries = buildConfig.precache ? await getManifestEntries() : [];

    const inputOptions = {
      input,
      plugins: [
        alias({ 'app-path': paths.appPath }),
        resolve(),
        re({
          patterns: [
            { test: 'process.env.NODE_ENV', replace: JSON.stringify('development' || NODE_ENV) },
            { test: 'const ENTRIES = [];', replace: `const ENTRIES = ${JSON.stringify(manifestEntries, null, 2)};` }
          ]
        })
      ].map(x => x)
    };

    const outputOptions = {
      file: path.join(paths.appPath, path.join('build', 'public', 'sw.js')),
      format: 'iife',
      sourcemap: !IS_PROD,
      compact: IS_PROD
    };

    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);

    Logger.log('Service Worker compiled.\n');
  } catch (error) {
    Logger.error(chalk.red(`Failed to compile Service Worker\n${input}`));
    Logger.error(error);
    Logger.log();

    process.exit(1);
  }
};
