process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const chalk = require('chalk');
const logger = require('@deity/falcon-logger');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('./config/paths');
const { getBuildConfig } = require('./tools');
const createConfig = require('./config/create');

process.noDeprecation = true; // turns off that loadQuery clutter.

// Checks if PORT and PORT_DEV are available and suggests alternatives if not
async function setPorts() {
  const port = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
  const portDev = (process.env.PORT_DEV && parseInt(process.env.PORT_DEV, 10)) || port + 1;

  const chosenPort = await choosePort(process.env.HOST, port);
  const chosenPortDev = await choosePort(process.env.HOST, portDev);

  process.env.PORT = chosenPort;
  process.env.PORT_DEV = chosenPortDev;
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = Webpack(config);
  } catch (e) {
    logger.error(chalk.red('Failed to compile.'));
    logger.error(e);

    process.exit(1);
  }

  return compiler;
}

function main() {
  const falconClientBuildConfig = getBuildConfig();
  if (falconClientBuildConfig.clearConsole) {
    clearConsole();
  }

  logger.info(chalk`{hex('#a9cf38') Compiling...}`);
  fs.emptyDirSync(paths.appBuild);

  const props = {
    inspect: process.argv.find(x => x.match(/--inspect-brk(=|$)/) || x.match(/--inspect(=|$)/)) || undefined
  };
  const clientConfig = createConfig('web', 'dev', props, falconClientBuildConfig, Webpack);
  const serverConfig = createConfig('node', 'dev', props, falconClientBuildConfig, Webpack);

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
  clientDevServer.listen(
    (process.env.PORT && parseInt(process.env.PORT, 10) + 1) || falconClientBuildConfig.port || 3001,
    err => {
      if (err) {
        logger.error(err);
      }
    }
  );
}

module.exports = () =>
  setPorts()
    .then(main)
    .catch(logger.error);
