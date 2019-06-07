const fs = require('fs-extra');
const path = require('path');
const deepMerge = require('deepmerge');
const clearConsole = require('react-dev-utils/clearConsole');
const Logger = require('@deity/falcon-logger');
const paths = require('../paths');

function requireOrExit(id) {
  try {
    // eslint-disable-next-line
    return require(id);
  } catch (e) {
    clearConsole();
    Logger.error(`File ${path.basename(id)} is invalid (${id}).`, e);
    process.exit(1);
  }
}

/**
 * @typedef {Object} FalconClientBuildConfig
 * @property {number} devServerPort webpack dev server port
 * @property {boolean} CI if Continuos Integration env
 * @property {boolean} clearConsole if clear console
 * @property {boolean} useWebmanifest is process Web App Manifest
 * @property {FalconSWBuildConfig} serviceWorker service Worker specific configuration
 * @property {Object} i18n i18n falcon client webpack plugin configuration
 * @property {string[]} envToBuildIn env vars to build in bundle
 * @property {(function|string)[]} plugins razzle compatible plugins
 * @property {Object} moduleOverride dictionary of module names to override
 */

/**
 * @typedef {Object} FalconSWBuildConfig
 * @property {boolean} precache if Workbox precache
 */

/**
 * Get falcon-client build config
 * @param {string} buildConfigFileName `falcon-client.build.config.js` falcon-client build time config relative path
 * @returns {FalconClientBuildConfig} falcon-client build time config
 */
function getBuildConfig(buildConfigFileName = 'falcon-client.build.config.js') {
  const buildConfigFilePath = paths.resolveApp(buildConfigFileName);
  const buildConfig = fs.existsSync(buildConfigFilePath) ? requireOrExit(buildConfigFilePath) : {};

  const buildConfigDefaults = {
    clearConsole: true,
    CI: false,
    devServerPort: 3001,
    useWebmanifest: false,
    serviceWorker: {
      precache: process.env.NODE_ENV === 'production'
    },
    i18n: {},
    envToBuildIn: [],
    plugins: [],
    moduleOverride: {}
  };

  const config = deepMerge(buildConfigDefaults, buildConfig, { arrayMerge: (destination, source) => source });

  return config;
}

module.exports = {
  getBuildConfig
};
