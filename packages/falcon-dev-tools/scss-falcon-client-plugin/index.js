const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCssOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: { flexbox: 'no-2009' },
      stage: 3
    })
  ],
  sourceMap: true
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
