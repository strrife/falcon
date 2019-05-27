const spawn = require('cross-spawn');
const Logger = require('@deity/falcon-logger');

module.exports = ({ target }) => {
  Logger.log('building esm...');

  if (target) {
    process.env.TARGET = target;
  }
  const babelConfigPath = require.resolve('./babel/babel.config');

  const result = spawn.sync(
    `babel`,
    ['src', '-d', 'dist', '-x', '.ts,.tsx,.js,.jsx', '-s', '--config-file', babelConfigPath, '--source-map', 'inline'],
    {
      stdio: 'inherit'
    }
  );

  if (result.status !== 0) {
    throw result;
  }
};
