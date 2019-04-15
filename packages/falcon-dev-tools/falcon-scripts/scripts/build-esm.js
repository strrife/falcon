const path = require('path');
const spawn = require('cross-spawn');
const Logger = require('@deity/falcon-logger');

module.exports = async ({ packagePath }) => {
  Logger.log('building esm...');

  const babelConfigPath = path.relative(packagePath, require.resolve('../babel.config.js'));

  const result = spawn.sync(`babel src -d dist -x .ts,.tsx -s --config-file ${babelConfigPath}`, [], {
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    throw result;
  }
};
