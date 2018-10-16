const fs = require('fs');
const deepMerge = require('deepmerge');
const clearConsole = require('react-dev-utils/clearConsole');
const Logger = require('@deity/falcon-logger');
const paths = require('./../paths');

/**
 * Get falcon-client build config
 * @param {string} buildConfigFileName='falcon-client.build.config.js' falcon-client build time config relative path
 * @returns {object} falcon-client build time config
 */
function getBuildConfig(buildConfigFileName = 'falcon-client.build.config.js') {
  let config = {
    clearConsole: true
  };

  const buildConfigPath = paths.resolveApp(buildConfigFileName);
  if (fs.existsSync(buildConfigPath)) {
    try {
      // eslint-disable-next-line
      config = deepMerge(config, require(buildConfigPath), { arrayMerge: (destination, source) => source });
    } catch (e) {
      clearConsole();
      Logger.error(`Invalid falcon-client.build.config.js file, (${buildConfigFileName}).`, e);
      process.exit(1);
    }
  }

  return config;
}

// function logAntThrowIfFileDesntExists(filePath,
// function failIfAppEntryFilesNotFound() {
//   if (fs.existsSync(path.join(paths.razzle.appPath, `index.js`)) === false) {
//     Logger.logAndThrow(`There is no 'index.js' file in '${paths.razzle.appPath}' directory!`);
//   }
//   if (fs.existsSync(path.join(paths.razzle.appPath, `falcon-client.config.js`)) === false) {
//     Logger.logAndThrow(`There is no 'falcon-client.config.js' file in '${paths.razzle.appPath}' directory!`);
//   }
// }

// module.exports = {
//   failIfAppEntryFilesNotFound
// };

module.exports = {
  getBuildConfig
};
