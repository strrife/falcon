const paths = require('./paths');

const config = {
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  babelConfigPath: require.resolve('../babel/babel.config')
};

module.exports = {
  config,
  paths
};
