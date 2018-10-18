/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const WebpackConfigHelpers = require('razzle-dev-utils/WebpackConfigHelpers');
// const NodeExternals = require('webpack-node-externals');
// const paths = require('./../paths');

// const webpackConfigHelper = new WebpackConfigHelpers(paths.razzle.appPath);

// function extendBabelInclude(includePaths = []) {
//   return config => {
//     const babelLoaderFinder = webpackConfigHelper.makeLoaderFinder('babel-loader');
//     const babelLoader = config.module.rules.find(babelLoaderFinder);
//     if (!babelLoader) {
//       throw new Error(`'babel-loader' was erased from config, it is required to configure '@deity/falcon-client'`);
//     }

//     babelLoader.include = [...babelLoader.include, ...includePaths];
//   };
// }

// function addToNodeExternals(whitelist) {
//   return (config, { target, dev }) => {
//     if (target === 'node') {
//       config.externals = [
//         NodeExternals({
//           whitelist: [
//             dev ? 'webpack/hot/poll?300' : null,
//             /\.(eot|woff|woff2|ttf|otf)$/,
//             /\.(svg|png|jpg|jpeg|gif|ico)$/,
//             /\.(mp4|mp3|ogg|swf|webp)$/,
//             /\.(css|scss|sass|sss|less)$/,
//             ...whitelist
//           ].filter(x => x)
//         })
//       ];
//     }
//   };
// }

/**
 * falcon-client and razzle integration plugin
 * @returns {object} razzle plugin
 */
module.exports = () => (config, { target /* , dev */ } /* , webpackObject */) => {
  // setEntryToFalconClient(config, target);
  // make sure that webpack handle @deity/falcon-client from shop directory
  // extendBabelInclude([paths.falconClient.appSrc, /@deity\/falcon-client\//])(config);
  // addToNodeExternals([/@deity\/falcon-client\//])(config, { target, dev });

  if (target === 'web' && process.env.NODE_ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
