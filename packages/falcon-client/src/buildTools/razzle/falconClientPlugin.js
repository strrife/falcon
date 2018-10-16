/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const razzlePluginTypescript = require('razzle-plugin-typescript');
const WebpackConfigHelpers = require('razzle-dev-utils/WebpackConfigHelpers');
const NodeExternals = require('webpack-node-externals');
const paths = require('./../paths');

const webpackConfigHelper = new WebpackConfigHelpers(paths.razzle.appPath);

function setEntryToFalconClient(config, target) {
  if (target === 'web') {
    const indexOfAppClientIndexJS = config.entry.client.findIndex(x => x === paths.razzle.appClientIndexJs);
    if (indexOfAppClientIndexJS < 0) {
      throw new Error(
        `can not find '${target}' entry '${
          paths.razzle.appClientIndexJs
        }', it is required to configure '@deity/falcon-client'`
      );
    }

    config.entry.client[indexOfAppClientIndexJS] = paths.falconClient.appClientIndexJs;
  }

  if (target === 'node') {
    const indexOfAppServerIndexJs = config.entry.findIndex(x => x === paths.razzle.appServerIndexJs);
    if (indexOfAppServerIndexJs < 0) {
      throw new Error(
        `can not find '${target}' entry '${
          paths.razzle.appServerIndexJs
        }', it is required to configure '@deity/falcon-client'`
      );
    }

    config.entry[indexOfAppServerIndexJs] = paths.falconClient.appServerIndexJs;
  }
}

function extendBabelInclude(includePaths = []) {
  return config => {
    const babelLoaderFinder = webpackConfigHelper.makeLoaderFinder('babel-loader');
    const babelLoader = config.module.rules.find(babelLoaderFinder);
    if (!babelLoader) {
      throw new Error(`'babel-loader' was erased from config, it is required to configure '@deity/falcon-client'`);
    }

    babelLoader.include = [...babelLoader.include, ...includePaths];
  };
}

// function addTypeScript(config, { target, dev }, webpackObject) {
//   razzlePluginTypescript(config, { target, dev }, webpackObject, {
//     useBabel: true,
//     useEslint: true,
//     forkTsChecker: {
//       tslint: false
//     }
//   });

//   // use latest ts-Loader
//   const tsLoaderFinder = webpackConfigHelper.makeLoaderFinder('ts-loader');
//   const tsRule = config.module.rules.find(tsLoaderFinder);
//   if (!tsRule) {
//     throw new Error(`'ts-loader' was erased from config, it is required to configure '@deity/falcon-client'`);
//   }

//   const indexOfTsLoader = tsRule.use.findIndex(tsLoaderFinder);
//   tsRule.use[indexOfTsLoader].loader = require.resolve('ts-loader');
// }

function addVendorsBundle(modules = []) {
  const moduleFilter = new RegExp(
    `[\\\\/]node_modules[\\\\/](${modules.map(x => x.replace('/', '[\\\\/]')).join('|')})[\\\\/]`
  );

  return (config, { target, dev }) => {
    if (target === 'web') {
      config.output.filename = dev ? 'static/js/[name].js' : 'static/js/[name].[hash:8].js';

      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: 'vendors',
              enforce: true,
              chunks: 'initial',
              test: moduleFilter
            }
          }
        }
      };
    }
  };
}

function addToNodeExternals(whitelist) {
  return (config, { target, dev }) => {
    if (target === 'node') {
      config.externals = [
        NodeExternals({
          whitelist: [
            dev ? 'webpack/hot/poll?300' : null,
            /\.(eot|woff|woff2|ttf|otf)$/,
            /\.(svg|png|jpg|jpeg|gif|ico)$/,
            /\.(mp4|mp3|ogg|swf|webp)$/,
            /\.(css|scss|sass|sss|less)$/,
            ...whitelist
          ].filter(x => x)
        })
      ];
    }
  };
}

/**
 * falcon-client and razzle integration plugin
 * @returns {object} razzle plugin
 */
module.exports = () => (config, { target, dev } /* , webpackObject */) => {
  setEntryToFalconClient(config, target);
  // make sure that webpack handle @deity/falcon-client from shop directory
  extendBabelInclude([paths.falconClient.appSrc, /@deity\/falcon-client\//])(config);
  addToNodeExternals([/@deity\/falcon-client\//])(config, { target, dev });

  // addTypeScript(config, { target, dev }, webpackObject);

  addVendorsBundle([
    'apollo-cache-inmemory',
    'apollo-client',
    'apollo-link',
    'apollo-link-http',
    'apollo-link-state',
    'apollo-utilities',
    'graphql',
    'graphql-tag',
    'node-fetch',
    'i18next',
    'i18next-xhr-backend',
    '@deity/falcon-client/build-utils/polyfills',
    'razzle',
    'react',
    'react-apollo',
    'react-async-bootstrapper2',
    'react-async-component',
    'react-dom',
    'react-google-tag-manager',
    `react-helmet`,
    'react-i18next',
    'react-router',
    'react-router-dom',
    'history'
  ])(config, { target, dev });
  // addFalconI18nPlugin(appConfig.i18n)(config, target);

  if (target === 'web' && process.env.NODE_ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
