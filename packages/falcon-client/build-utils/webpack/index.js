const fs = require('fs-extra');
const chalk = require('chalk');
const Logger = require('@deity/falcon-logger');
const WebpackDevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('react-dev-utils/FileSizeReporter');

const paths = require('../paths');
const {
  exitIfBuildingItself,
  exitIfNoRequiredFiles,
  getBuildConfig,
  getFullIcuPath,
  removePreviousBuildAssets,
  webpackCompiler,
  webpackCompileAsync,
  logDeityGreenInfo
} = require('./tools');
const createConfig = require('./config/create');

module.exports.startDevServer = async () => {
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
  process.env.BABEL_ENV = process.env.NODE_ENV;

  logDeityGreenInfo('Starting development server...');
  const fullIcuPath = getFullIcuPath();
  if (fullIcuPath) {
    process.env.NODE_ICU_DATA = fullIcuPath;
  }

  try {
    removePreviousBuildAssets(paths.appBuild, paths.appBuildPublic);
    const inspect = process.argv.find(x => x.match(/--inspect-brk(=|$)/) || x.match(/--inspect(=|$)/)) || undefined;

    const clientConfig = createConfig('web', { startDevServer: true, inspect, paths, buildConfig });
    const serverConfig = createConfig('node', { startDevServer: true, inspect, paths, buildConfig });

    // Compile our assets with webpack
    const clientCompiler = webpackCompiler(clientConfig);
    const serverCompiler = webpackCompiler(serverConfig);

    // Start our server webpack instance in watch mode after assets compile
    clientCompiler.plugin('done', () => {
      serverCompiler.watch(
        {
          quiet: true,
          stats: 'none'
        },
        /* eslint-disable no-unused-vars */
        stats => {}
      );
    });

    // Create a new instance of Webpack-dev-server for our client assets.
    const clientDevServer = new WebpackDevServer(clientCompiler, clientConfig.devServer);
    clientDevServer.listen(buildConfig.devServerPort, error => {
      if (error) {
        Logger.error(error);
      }
    });
  } catch (error) {
    Logger.error('Compilation failed!');

    throw error;
  }
};

module.exports.build = async () => {
  exitIfBuildingItself();
  const buildConfig = getBuildConfig();
  exitIfNoRequiredFiles(buildConfig);

  if (buildConfig.clearConsole) {
    clearConsole();
  }

  if (!process.env.NODE_ENV) {
    // default! - needs to be `development`
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = process.env.NODE_ENV;
  }
  const { NODE_ENV, PUBLIC_PATH } = process.env;

  logDeityGreenInfo(`Creating an ${NODE_ENV.toUpperCase()} build...`);

  try {
    const previousBuildSizes = await measureFileSizesBeforeBuild(paths.appBuildPublic);
    fs.emptyDirSync(paths.appBuild);
    fs.copySync(paths.appPublic, paths.appBuildPublic, { dereference: true });

    // First compile the client. We need it to properly output assets.json
    // (asset manifest file with the correct hashes on file names BEFORE we can start the server compiler).

    const clientConfig = createConfig('web', { publicPath: PUBLIC_PATH, paths, buildConfig });
    const clientCompilation = await webpackCompileAsync(clientConfig, buildConfig.CI);

    const serverConfig = createConfig('node', { publicPath: PUBLIC_PATH, paths, buildConfig });
    // ContextReplacementPlugin https://webpack.js.org/plugins/context-replacement-plugin/
    /* const serverCompilation = */ await webpackCompileAsync(serverConfig, buildConfig.CI);

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

module.exports.size = async () => {
  exitIfBuildingItself();
  const buildConfig = getBuildConfig();
  exitIfNoRequiredFiles(buildConfig);

  if (buildConfig.clearConsole) {
    clearConsole();
  }
  logDeityGreenInfo('Creating an optimized production build...');

  process.env.NODE_ENV = 'production';
  process.env.BABEL_ENV = process.env.NODE_ENV;
  const { PUBLIC_PATH } = process.env;

  try {
    fs.emptyDirSync(paths.appBuild);
    fs.copySync(paths.appPublic, paths.appBuildPublic, { dereference: true });

    Logger.log('Compiling client...');
    const clientConfig = createConfig('web', { publicPath: PUBLIC_PATH, analyze: true, paths, buildConfig });
    const { warnings } = await webpackCompileAsync(clientConfig);

    if (warnings.length) {
      Logger.warn(chalk.yellow('\nCompiled client with warnings.\n'));
      Logger.warn(warnings.join('\n\n'));
      Logger.log();
    } else {
      Logger.log(chalk.green('\nCompiled client successfully.\n'));
    }

    Logger.log();
  } catch (error) {
    Logger.error(`${chalk.red('\nFailed to compile client.\n')}`);
    Logger.error(error);
    Logger.log();

    process.exit(1);
  }
};
