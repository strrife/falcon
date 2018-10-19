const chalk = require('chalk');
const Logger = require('@deity/falcon-logger');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('./../paths');
const { getBuildConfig, removePreviousBuildAssets, webpackCompiler } = require('./tools');
const createConfig = require('./config/create');

module.exports = async () => {
  if (!checkRequiredFiles([paths.appIndexJs])) {
    process.exit(1);
  }

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.BABEL_ENV = process.env.NODE_ENV;
  process.env.HOST = process.env.HOST || 'localhost';
  process.env.PORT = await choosePort(process.env.HOST, parseInt(process.env.PORT, 10) || 3000);

  process.noDeprecation = true; // turns off that loadQuery clutter.

  try {
    const falconConfig = getBuildConfig();
    if (falconConfig.clearConsole) {
      clearConsole();
    }

    Logger.info(chalk`{hex('#a9cf38') Compiling...}`);
    removePreviousBuildAssets(paths.appBuild, paths.appBuildPublic);

    const options = {
      env: process.env.NODE_ENV,
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      devServerPort: parseInt(process.env.PORT, 10) + 1,
      inspect: process.argv.find(x => x.match(/--inspect-brk(=|$)/) || x.match(/--inspect(=|$)/)) || undefined
    };

    const clientConfig = createConfig('web', options, falconConfig, Webpack);
    const serverConfig = createConfig('node', options, falconConfig, Webpack);

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
    clientDevServer.listen(options.devServerPort, error => {
      if (error) {
        Logger.error(error);
      }
    });
  } catch (error) {
    Logger.error('Compilation failed!');

    throw error;
  }
};
