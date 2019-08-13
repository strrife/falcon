const spawn = require('cross-spawn');
const { config } = require('./tools');

module.exports.build = () => {
  console.log('building esm...');

  const result = spawn.sync(
    `babel`,
    [
      'src',
      '-d',
      'dist',
      '-x',
      config.fileExtensions.join(','),
      '--ignore',
      `**/__mocks__,${config.fileExtensions.map(x => `**/*.test${x}`).join(',')}`,
      '-s',
      '--config-file',
      config.babelConfigPath,
      '--source-map',
      'inline'
    ],
    {
      stdio: 'inherit'
    }
  );

  if (result.status !== 0) {
    throw result;
  }
};

module.exports.watch = () => {
  console.log('building esm...');

  const result = spawn.sync(
    `babel`,
    [
      'src',
      '-d',
      'dist',
      '-x',
      config.fileExtensions.join(','),
      '--ignore',
      `**/__mocks__,${config.fileExtensions.map(x => `**/*.test${x}`).join(',')}`,
      '-s',
      '--config-file',
      config.babelConfigPath,
      '--source-map',
      'inline',
      '--watch'
    ],
    {
      stdio: 'inherit'
    }
  );

  if (result.status !== 0) {
    throw result;
  }
};
