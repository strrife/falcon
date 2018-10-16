const path = require('path');
const jest = require('jest');

module.exports = () => {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
  process.env.PUBLIC_URL = '';

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', err => {
    throw err;
  });

  // Ensure environment variables are read.
  require('./../webpack/config/env');

  const paths = require('./../webpack/config/paths');
  const createConfig = require('./config/create');
  const config = createConfig(path.resolve(paths.appSrc, '..'));

  const argv = process.argv.slice(2);
  // Watch unless on CI or in coverage mode
  if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');
  }
  argv.push('--config', JSON.stringify(config));

  jest.run(argv);
};
