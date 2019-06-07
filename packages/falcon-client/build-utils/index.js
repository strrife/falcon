const clearConsole = require('react-dev-utils/clearConsole');
const Logger = require('@deity/falcon-logger');
const { exitIfBuildingItself, exitIfNoRequiredFiles, getBuildConfig } = require('./tools');
const { logDeityGreenInfo } = require('./webpack/tools');
const application = require('./webpack');
const serviceWorker = require('./serviceWorker');
const jest = require('./jest');

const startDevServer = async () => {
  exitIfBuildingItself();
  const buildConfig = getBuildConfig();
  exitIfNoRequiredFiles(buildConfig);

  if (buildConfig.clearConsole) {
    clearConsole();
  }

  if (process.env.NODE_ENV !== 'development') {
    if (process.env.NODE_ENV !== undefined) {
      Logger.warn(
        `Development Server cannot be started with 'process.env.NODE_ENV=${
          process.env.NODE_ENV
        }' setting, only 'development' is supported, it will be ignored.`
      );
    }
    process.env.NODE_ENV = 'development';
  }

  await application.startDevServer(buildConfig);
  await serviceWorker.build(buildConfig.serviceWorker); // TODO: watch instead
};

const build = async () => {
  exitIfBuildingItself();
  const buildConfig = getBuildConfig();
  exitIfNoRequiredFiles(buildConfig);

  if (buildConfig.clearConsole) {
    clearConsole();
  }

  if (!process.env.NODE_ENV) {
    // default! - needs to be `development`
    process.env.NODE_ENV = 'production';
  }
  logDeityGreenInfo(`Creating an ${process.env.NODE_ENV.toUpperCase()} build...`);

  await application.build(buildConfig);
  await serviceWorker.build(buildConfig.serviceWorker);
};

const size = async () => {
  exitIfBuildingItself();
  const buildConfig = getBuildConfig();
  exitIfNoRequiredFiles(buildConfig);

  if (buildConfig.clearConsole) {
    clearConsole();
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
  }
  logDeityGreenInfo(`Creating an ${process.env.NODE_ENV.toUpperCase()} build...`);

  await application.size(buildConfig);
};

module.exports = {
  startDevServer,
  build,
  size,
  test: jest
};
