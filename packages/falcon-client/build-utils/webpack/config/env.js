const path = require('path');
const paths = require('./../../paths');

function getClientEnv(target, env, publicPath, devServerPort, envToBuildIn) {
  const raw = Object.keys(process.env)
    .filter(x => envToBuildIn.find(e => e === x))
    .reduce(
      (result, x) => {
        result[x] = process.env[x];
        return result;
      },
      {
        NODE_ENV: env,
        BABEL_ENV: env,
        ...(env === 'development' ? { DEV_SERVER_PORT: devServerPort } : {}),
        BUILD_TARGET: target === 'web' ? 'client' : 'server',
        PUBLIC_PATH: env === 'production' ? publicPath : undefined,
        WEBPACK_ASSETS: paths.appWebpackAssets,
        OUTPUT_DIR: path.relative(paths.appPath, paths.appBuildPublic),
        PUBLIC_DIR: path.relative(paths.appPath, env === 'production' ? paths.appBuildPublic : paths.appPublic),
        SW_DIR: path.relative(paths.appPath, env === 'production' ? paths.appBuildPublic : paths.appBuild)
      }
    );

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = Object.keys(raw).reduce((result, x) => {
    result[`process.env.${x}`] = JSON.stringify(raw[x]);
    return result;
  }, {});

  return { raw, stringified };
}

module.exports = {
  getClientEnv
};
