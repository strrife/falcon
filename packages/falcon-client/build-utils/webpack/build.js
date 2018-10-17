// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

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

// Wrap webpack compile in a try catch.
function compile(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    Logger.error(chalk.red('Failed to compile.'));
    Logger.error(e);

    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}

// Helper function to copy public directory to build/public
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuildPublic, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

function build() {
  process.env.NODE_ENV = 'production';

  // Ensure environment variables are read.
  require('./config/env');

  const falconConfig = getBuildConfig();
  if (falconConfig.clearConsole) {
    clearConsole();
  }

  const options = {
    env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
  };

  // Create our production webpack configurations and pass in razzle options.
  const clientConfig = createConfig('web', options, falconConfig, webpack);
  const serverConfig = createConfig('node', options, falconConfig, webpack);

  process.noDeprecation = true; // turns off that loadQuery clutter.

  console.log('Creating an optimized production build...');
  console.log('Compiling client...');
  // First compile the client. We need it to properly output assets.json (asset
  // manifest file with the correct hashes on file names BEFORE we can start
  // the server compiler.
  return new Promise((resolve, reject) => {
    compile(clientConfig, (err, clientStats) => {
      if (err) {
        reject(err);
      }
      const clientMessages = formatWebpackMessages(clientStats.toJson({}, true));
      if (clientMessages.errors.length) {
        return reject(new Error(clientMessages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        clientMessages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\nMost CI servers set it automatically.\n'
          )
        );
        return reject(new Error(clientMessages.warnings.join('\n\n')));
      }

      console.log(chalk.green('Compiled client successfully.'));
      console.log('Compiling server...');
      compile(serverConfig, (serverErr, serverStats) => {
        if (serverErr) {
          reject(serverErr);
        }
        const serverMessages = formatWebpackMessages(serverStats.toJson({}, true));
        if (serverMessages.errors.length) {
          return reject(new Error(serverMessages.errors.join('\n\n')));
        }
        if (
          process.env.CI &&
          (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
          serverMessages.warnings.length
        ) {
          console.log(
            chalk.yellow(
              '\nTreating warnings as errors because process.env.CI = true.\n' +
                'Most CI servers set it automatically.\n'
            )
          );
          return reject(new Error(serverMessages.warnings.join('\n\n')));
        }
        console.log(chalk.green('Compiled server successfully.'));
        return resolve({
          stats: clientStats,
          warnings: Object.assign({}, clientMessages.warnings, serverMessages.warnings)
        });
      });
    });
  });
}

module.exports = async () => {
  if (!checkRequiredFiles([paths.appIndexJs])) {
    process.exit(1);
  }

  const previousBuildSizes = await measureFileSizesBeforeBuild(paths.appBuildPublic);

  fs.emptyDirSync(paths.appBuild);
  copyPublicFolder();

  try {
    const { stats, warnings } = await build();

    if (warnings.length) {
      Logger.warn(chalk.yellow('\nCompiled with warnings.\n'));
      Logger.warn(warnings.join('\n\n'));

      Logger.info(`\nSearch for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`);
      Logger.info(`To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`);
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
