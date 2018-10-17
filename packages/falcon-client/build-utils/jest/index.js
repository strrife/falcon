const jest = require('jest');

module.exports = () => {
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
  process.env.PUBLIC_URL = '';

  // Ensure environment variables are read.
  require('./../webpack/config/env');

  const paths = require('./../paths');
  const createConfig = require('./config/create');
  const config = createConfig(paths);

  const argv = process.argv.slice(2);
  // Watch unless on CI or in coverage mode
  if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');
  }
  argv.push('--config', JSON.stringify(config));

  jest.run(argv);
};
