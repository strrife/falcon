const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');

const postCssOptions = {
  ident: 'postcss',
  sourceMap: true,
  plugins: () => [
    PostCssFlexBugFixes,
    autoprefixer({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009'
    })
  ]
};

module.exports = (config, { target, dev, paths } /* , webpack */) => {
  const IS_NODE = target !== 'web';

  const styleLoader = {
    loader: require.resolve('style-loader'),
    options: {}
  };

  const cssLoader = {
    loader: require.resolve('css-loader')
  };

  const resolveUrlLoader = {
    loader: require.resolve('resolve-url-loader')
  };

  const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: postCssOptions
  };

  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      includePaths: [paths.appNodeModules],
      sourceMap: true
    }
  };

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(sass|scss)$/,
      use: IS_NODE
        ? [
            {
              loader: require.resolve('css-loader/locals'),
              options: {
                sourceMap: true,
                importLoaders: 1
                // modules: false
                // prod: {
                //   // minimize: true
                // }
              }
            }
          ]
        : [dev ? styleLoader : MiniCssExtractPlugin.loader, cssLoader, resolveUrlLoader, postCssLoader, sassLoader]
    }
  ];

  return config;
};
