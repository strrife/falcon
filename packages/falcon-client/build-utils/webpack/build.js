const fs = require('fs-extra');
const chalk = require('chalk');
const Logger = require('@deity/falcon-logger');
const webpack = require('webpack');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');
const clearConsole = require('react-dev-utils/clearConsole');

const paths = require('./../paths');
const createConfig = require('./config/create');
const { getBuildConfig } = require('./tools');

function webpackCompiler(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (error) {
    Logger.error(chalk.red('Failed to compile.'));
    Logger.error(error);

    process.exit(1);
  }

  return compiler;
}

function webpackCompileAsync(config, emitWarningsAsErrors = false) {
  return new Promise((resolve, reject) => {
    const compiler = webpackCompiler(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }

      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (emitWarningsAsErrors && messages.warnings.length) {
        Logger.warn(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\nMost CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      return resolve({
        stats,
        warnings: messages.warnings
      });
    });
  });
}

async function build() {
  process.env.NODE_ENV = 'production';

  process.noDeprecation = true; // turns off that loadQuery clutter.

  // Ensure environment variables are read.
  require('./config/env');

  const falconConfig = getBuildConfig();
  if (falconConfig.clearConsole) {
    clearConsole();
  }

  const options = {
    env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
  };

  const clientConfig = createConfig('web', options, falconConfig, webpack);
  const serverConfig = createConfig('node', options, falconConfig, webpack);

  const emitWarningsAsErrors =
    process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false');

  // First compile the client. We need it to properly output assets.json
  // (asset manifest file with the correct hashes on file names BEFORE we can start the server compiler).

  Logger.log('Compiling client...');
  const clientCompilation = await webpackCompileAsync(clientConfig, emitWarningsAsErrors);
  Logger.log(chalk.green('Compiled client successfully.'));

  Logger.log('Compiling server...');
  // ContextReplacementPlugin https://webpack.js.org/plugins/context-replacement-plugin/
  /* const serverCompilation = */ await webpackCompileAsync(serverConfig, emitWarningsAsErrors);
  Logger.log(chalk.green('Compiled server successfully.'));

  return {
    stats: clientCompilation.stats,
    warnings: [...clientCompilation.warnings] // , ...serverCompilation.warnings]
  };
}

module.exports = async () => {
  if (!checkRequiredFiles([paths.appIndexJs])) {
    process.exit(1);
  }

  Logger.log('Creating an optimized production build...');

  const previousBuildSizes = await measureFileSizesBeforeBuild(paths.appBuildPublic);

  fs.emptyDirSync(paths.appBuild);
  fs.copySync(paths.appPublic, paths.appBuildPublic, { dereference: true });

  try {
    const { stats, warnings } = await build();

    if (warnings.length) {
      Logger.warn(chalk.yellow('\nCompiled with warnings.\n'));
      Logger.warn(warnings.join('\n\n'));
    } else {
      Logger.log(chalk.green('\nCompiled successfully.\n'));
    }

    Logger.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(stats, previousBuildSizes, paths.appBuild);
    Logger.log();
  } catch (error) {
    Logger.error(`${chalk.red('\nFailed to compile.\n')}`);
    Logger.error(error);
    Logger.log();

    process.exit(1);
  }
};
