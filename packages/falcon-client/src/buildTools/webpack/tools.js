const fs = require('fs');
const path = require('path');
const clearConsole = require('react-dev-utils/clearConsole');
const logger = require('@deity/falcon-logger');

function pathResolve() {
  const appDirectory = fs.realpathSync(process.cwd());
  /**
   * Make sure any symlinks in the project folder are resolved:
   * https://github.com/facebookincubator/create-react-app/issues/637
   * @param {string} appRelativePath sds
   * @returns {string} path relative to `process.cwd()`
   */
  return appRelativePath => path.resolve(appDirectory, appRelativePath);
}

/**
 * Get falcon-client build config
 * @param {string} configName='falcon-client.build.config.js' falcon-client build time config relative path
 * @returns {object} falcon-client build time config
 */
function getBuildConfig(configName = 'falcon-client.build.config.js') {
  let config = {};

  const configPath = pathResolve()(configName);
  if (fs.existsSync(configPath)) {
    try {
      // eslint-disable-next-line
      config = require(configPath);
    } catch (e) {
      clearConsole();
      logger.error(`Invalid falcon-client build.config.js file, (${configName}).`, e);
      process.exit(1);
    }
  }

  return config;
}

module.exports = {
  pathResolve: pathResolve(),
  getBuildConfig
};
