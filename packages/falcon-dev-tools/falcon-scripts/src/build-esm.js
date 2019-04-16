const spawn = require('cross-spawn');
const Logger = require('@deity/falcon-logger');

module.exports = async () => {
  Logger.log('building esm...');

  const babelConfigPath = require.resolve('./babel/babel.config');

  const result = spawn.sync(`babel src -d dist -x .js,.jsx,.ts,.tsx -s --config-file ${babelConfigPath}`, [], {
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    throw result;
  }
};
