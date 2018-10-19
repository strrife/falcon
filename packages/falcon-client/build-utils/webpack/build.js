const fs = require('fs-extra');
const chalk = require('chalk');
const Logger = require('@deity/falcon-logger');
const webpack = require('webpack');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const clearConsole = require('react-dev-utils/clearConsole');

const paths = require('./../paths');
const createConfig = require('./config/create');
const { getBuildConfig, webpackCompileAsync } = require('./tools');

module.exports = async () => {
  if (!checkRequiredFiles([paths.appIndexJs])) {
    process.exit(1);
  }

  process.env.NODE_ENV = 'production';
  process.env.BABEL_ENV = process.env.NODE_ENV;
  process.noDeprecation = true; // turns off that loadQuery clutter.

  const options = {
    env: process.env.NODE_ENV,
    publicPath: process.env.PUBLIC_PATH || '/'
  };

  const falconConfig = getBuildConfig();
  if (falconConfig.clearConsole) {
    clearConsole();
  }

  Logger.log('Creating an optimized production build...');
  const previousBuildSizes = await measureFileSizesBeforeBuild(paths.appBuildPublic);
  fs.emptyDirSync(paths.appBuild);
  fs.copySync(paths.appPublic, paths.appBuildPublic, { dereference: true });

  try {
    const emitWarningsAsErrors =
      process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false');

    // First compile the client. We need it to properly output assets.json
    // (asset manifest file with the correct hashes on file names BEFORE we can start the server compiler).

    Logger.log('Compiling client...');
    const clientConfig = createConfig('web', options, falconConfig, webpack);
    const clientCompilation = await webpackCompileAsync(clientConfig, emitWarningsAsErrors);
    Logger.log(chalk.green('Compiled client successfully.'));

    Logger.log('Compiling server...');
    const serverConfig = createConfig('node', options, falconConfig, webpack);
    // ContextReplacementPlugin https://webpack.js.org/plugins/context-replacement-plugin/
    /* const serverCompilation = */ await webpackCompileAsync(serverConfig, emitWarningsAsErrors);
    Logger.log(chalk.green('Compiled server successfully.'));

    const warnings = [...clientCompilation.warnings]; // , ...serverCompilation.warnings]

    if (warnings.length) {
      Logger.warn(chalk.yellow('\nCompiled with warnings.\n'));
      Logger.warn(warnings.join('\n\n'));
      Logger.log();
    } else {
      Logger.log(chalk.green('\nCompiled successfully.\n'));
    }

    Logger.log('File sizes after gzip:\n');
    const { stats } = clientCompilation;
    printFileSizesAfterBuild(stats, previousBuildSizes, paths.appBuild);

    Logger.log();
  } catch (error) {
    Logger.error(`${chalk.red('\nFailed to compile.\n')}`);
    Logger.error(error);
    Logger.log();

    process.exit(1);
  }
};
