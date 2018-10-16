const fs = require('fs-extra');
const chalk = require('chalk');
const Logger = require('@deity/falcon-logger');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('./config/paths');
const { getBuildConfig } = require('./tools');
const createConfig = require('./config/create');

function compile(config) {
  let compiler;
  try {
    compiler = Webpack(config);
  } catch (e) {
    Logger.error(chalk.red('Failed to compile.'));
    Logger.error(e);

    process.exit(1);
  }

  return compiler;
}

module.exports = async () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.HOST = process.env.HOST || 'localhost';
  process.env.PORT = await choosePort(process.env.HOST, parseInt(process.env.PORT, 10) || 3000);

  process.noDeprecation = true; // turns off that loadQuery clutter.

  try {
    const falconConfig = getBuildConfig();
    if (falconConfig.clearConsole) {
      clearConsole();
    }

    Logger.info(chalk`{hex('#a9cf38') Compiling...}`);
    fs.emptyDirSync(paths.appBuild);

    const options = {
      env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      devServerPort: parseInt(process.env.PORT, 10) + 1,
      inspect: process.argv.find(x => x.match(/--inspect-brk(=|$)/) || x.match(/--inspect(=|$)/)) || undefined
    };

    const clientConfig = createConfig('web', options, falconConfig, Webpack);
    const serverConfig = createConfig('node', options, falconConfig, Webpack);

    // Compile our assets with webpack
    const clientCompiler = compile(clientConfig);
    const serverCompiler = compile(serverConfig);

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
    // This will actually run on a different port than the users app.
    const clientDevServer = new WebpackDevServer(clientCompiler, clientConfig.devServer);

    // Start Webpack-dev-server
    clientDevServer.listen(options.devServerPort, err => {
      if (err) {
        Logger.error(err);
      }
    });
  } catch (error) {
    Logger.error('Compilation failed!');

    throw error;
  }
};
