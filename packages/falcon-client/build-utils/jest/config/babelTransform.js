const babelJest = require('babel-jest');
// const paths = require('./../webpack/config/paths');
// const fs = require('fs-extra');

const hasBabelRc = false; // fs.existsSync(paths.appBabelRc);

const config = {
  presets: !hasBabelRc && [require.resolve('@deity/babel-preset-falcon-client')],
  babelrc: !!hasBabelRc
};

module.exports = babelJest.createTransformer(config);
