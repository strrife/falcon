#! /usr/bin/env node

process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const chalk = require('chalk');
const logger = require('@deity/falcon-logger');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server-speedy');
const clearConsole = require('react-dev-utils/clearConsole');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('./config/paths');
const createConfig = require('./config/create');

process.noDeprecation = true; // turns off that loadQuery clutter.
// Capture any --inspect or --inspect-brk flags (with optional values) so that we
// can pass them when we invoke nodejs
process.env.INSPECT_BRK = process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || '';
process.env.INSPECT = process.argv.find(arg => arg.match(/--inspect(=|$)/)) || '';

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
    console.log(chalk.red('Failed to compile.'));
    console.log();
    [e].forEach(err => {
      console.log(err.message || err);
      console.log();
    });

    process.exit(1);
  }
  return compiler;
}

function main() {
  // Optimistically, we make the console look exactly like the output of our
  // FriendlyErrorsPlugin during compilation, so the user has immediate feedback.
  // clearConsole();
  logger.info(chalk`{hex('#a9cf38') Compiling...}`);
  let razzle = {};

  // Check for razzle.config.js file
  if (fs.existsSync(paths.appRazzleConfig)) {
    try {
      // eslint-disable-next-line
      razzle = require(paths.appRazzleConfig);
    } catch (e) {
      clearConsole();
      logger.error('Invalid razzle.config.js file.', e);
      process.exit(1);
    }
  }

  // Delete assets.json to always have a manifest up to date
  fs.removeSync(paths.appManifest);

  // Create dev configs using our config factory, passing in razzle file as
  // options.
  const clientConfig = createConfig('web', 'dev', razzle, Webpack);
  const serverConfig = createConfig('node', 'dev', razzle, Webpack);

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
  clientDevServer.listen((process.env.PORT && parseInt(process.env.PORT, 10) + 1) || razzle.port || 3001, err => {
    if (err) {
      logger.error(err);
    }
  });
}

setPorts()
  .then(main)
  .catch(console.error);
