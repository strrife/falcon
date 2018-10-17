const paths = require('./../../paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./../../paths')];

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

// Grab NODE_ENV and RAZZLE_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const RAZZLE = /^RAZZLE_/i;

function getClientEnvironment(target, options) {
  const raw = Object.keys(process.env)
    .filter(key => RAZZLE.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || options.port || 3000, // TODO only in DEV !!!!!!!!!!!!
        // HOST: process.env.HOST || options.host || 'localhost',
        RAZZLE_ASSETS_MANIFEST: paths.appManifest,
        BUILD_TARGET: target === 'web' ? 'client' : 'server',
        // only for production builds. Useful if you need to serve from a CDN
        PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
        // The public dir changes between dev and prod, so we use an environment
        // variable available to users.
        RAZZLE_PUBLIC_DIR: process.env.NODE_ENV === 'production' ? paths.appBuildPublic : paths.appPublic
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = Object.keys(raw).reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(raw[key]);
    return env;
  }, {});

  return { raw, stringified };
}

module.exports = {
  getClientEnv: getClientEnvironment
};
