const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

/**
 * Make sure any symlinks in the project folder are resolved:
 * https://github.com/facebookincubator/create-react-app/issues/637
 * @param {string} appRelativePath path relative to app directory (process.cwd())
 * @returns {string} absolute path
 */
const resolveApp = appRelativePath => path.resolve(appDirectory, appRelativePath);

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

const resolvePackageDir = name => path.dirname(require.resolve(`${name}/package.json`));

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const nodePath = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appBuildPublic: resolveApp('build/public'),
  appManifest: resolveApp('build/assets.json'),
  appPublic: resolveApp('public'),
  appNodeModules: resolveApp('node_modules'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appServerIndexJs: resolveOwn('src/index'),
  appClientIndexJs: resolveOwn('src/client'),
  testsSetup: resolveApp('src/setupTests.js'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc'),
  nodePath,
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'),
  resolveApp,
  resolvePackageDir
};
