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

const defaultOptions = {
  css: {
    dev: {
      sourceMap: true,
      importLoaders: 1,
      modules: false
    },
    prod: {
      sourceMap: false,
      importLoaders: 1,
      modules: false,
      minimize: true
    }
  }
};

module.exports = (defaultConfig, { target, dev, paths }, webpack, userOptions = {}) => {
  const IS_NODE = target !== 'web';
  const ENV = dev ? 'dev' : 'prod';

  const config = Object.assign({}, defaultConfig);

  const options = Object.assign({}, defaultOptions, userOptions);

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
      test: /\.(sa|sc)ss$/,
      use: IS_NODE
        ? [
            {
              loader: require.resolve('css-loader/locals'),
              options: options.css[ENV]
            }
          ]
        : [dev ? styleLoader : MiniCssExtractPlugin.loader, cssLoader, resolveUrlLoader, postCssLoader, sassLoader]
    }
  ];

  return config;
};
