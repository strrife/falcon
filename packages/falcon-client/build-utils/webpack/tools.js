const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const deepMerge = require('deepmerge');
const webpack = require('webpack');
const Logger = require('@deity/falcon-logger');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const paths = require('./../paths');

function webpackCompiler(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (error) {
    Logger.error(chalk.red('Failed to compile.'));
    Logger.error(error);

    process.exit(1);
  }

  return compiler;
}

function webpackCompileAsync(config, emitWarningsAsErrors = false) {
  return new Promise((resolve, reject) => {
    const compiler = webpackCompiler(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }

      const { errors, warnings } = formatWebpackMessages(stats.toJson({}, true));
      if (errors.length) {
        return reject(new Error(errors.join('\n\n')));
      }
      if (emitWarningsAsErrors && warnings.length) {
        Logger.warn(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\nMost CI servers set it automatically.\n'
          )
        );
        return reject(new Error(warnings.join('\n\n')));
      }

      return resolve({
        stats,
        warnings
      });
    });
  });
}

function removePreviousBuildAssets(appBuild, appBuildPublic) {
  if (fs.existsSync(appBuild)) {
    const productionPublicDirName = path.relative(appBuild, appBuildPublic);
    fs.readdirSync(appBuild)
      .filter(x => x !== productionPublicDirName)
      .forEach(file => fs.removeSync(path.join(appBuild, file)));
  }
}

/**
 * @typedef {object} FalconClientBuildConfig
 * @property {boolean} clearConsole if clear console
 * @property {boolean} useWebmanifest is process Web App Manifest
 * @property {object} i18n i18n falcon client webpack plugin configuration
 * @property {string[]} envToBuildIn env vars to build in bundle
 * @property {(function|string)[]} plugins razzle compatible plugins
 */

/**
 * Get falcon-client build config
 * @param {string} buildConfigFileName='falcon-client.build.config.js' falcon-client build time config relative path
 * @returns {FalconClientBuildConfig} falcon-client build time config
 */
function getBuildConfig(buildConfigFileName = 'falcon-client.build.config.js') {
  const configDefaults = {
    clearConsole: true,
    useWebmanifest: false,
    i18n: {},
    envToBuildIn: [],
    plugins: []
  };

  const buildConfigPath = paths.resolveApp(buildConfigFileName);
  if (fs.existsSync(buildConfigPath)) {
    try {
      // eslint-disable-next-line
      return deepMerge(configDefaults, require(buildConfigPath), { arrayMerge: (destination, source) => source });
    } catch (e) {
      clearConsole();
      Logger.error(`Invalid falcon-client.build.config.js file, (${buildConfigFileName}).`, e);
      process.exit(1);
    }
  }

  return configDefaults;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} Bytes`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(3)} KB`;
  else if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(3)} MB`;
  return `${(bytes / 1073741824).toFixed(3)} GB`;
}

module.exports = {
  getBuildConfig,
  removePreviousBuildAssets,
  webpackCompiler,
  webpackCompileAsync,
  formatBytes
};
