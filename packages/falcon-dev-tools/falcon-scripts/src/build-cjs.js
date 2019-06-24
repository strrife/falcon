const path = require('path');
const glob = require('glob');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const Logger = require('@deity/falcon-logger');
const { paths } = require('./tools');

const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false;
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

module.exports.main = async () => {
  Logger.log('building cjs...');

  process.env.ROLLUP = true;
  // process.env.TARGET = 'NODE';

  const extensions = ['.tsx', '.ts', '.jsx', '.js'];

  const inputFiles = glob.sync(`${path.join(paths.pkgSrc, 'index')}@(${extensions.map(x => `*${x}`).join('|')})`);
  if (inputFiles.length !== 1) {
    throw new Error(`Directory "${paths.pkgSrc}" should contain single "index" file!`);
  }

  // eslint-disable-next-line
  const packageJson = require(paths.pkgPackageJson);

  const format = 'cjs';
  const inputOptions = {
    input: inputFiles[0],
    external: makeExternalPredicate([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {})
    ]),
    plugins: [
      nodeResolve({
        extensions
      }),
      commonjs(),
      babel({
        extensions,
        runtimeHelpers: true,
        ...require('./babel/babel.config')
      })
    ]
  };
  const outputOptions = { file: packageJson.main, format, sourcemap: true };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
};

module.exports.bin = async () => {
  console.log('building cli...');

  process.env.ROLLUP = true;
  // process.env.TARGET = 'NODE';

  const extensions = ['.tsx', '.ts', '.jsx', '.js'];

  const inputFiles = glob.sync(`${path.join(paths.pkgBinSrc, 'index')}@(${extensions.map(x => `*${x}`).join('|')})`);
  if (inputFiles.length === 0) {
    // nothing to compile
    return;
  }
  if (inputFiles.length !== 1) {
    throw new Error(`'Directory '${paths.pkgBinSrc}' should contain single 'index' file!`);
  }

  // eslint-disable-next-line
  const packageJson = require(paths.pkgPackageJson);

  const format = 'cjs';
  const inputOptions = {
    input: inputFiles[0],
    external: makeExternalPredicate([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {})
    ]),
    plugins: [
      nodeResolve({
        extensions
      }),
      babel({
        extensions,
        runtimeHelpers: true,
        ...require('./babel/babel.config')
      }),
      commonjs()
    ]
  };
  const outputOptions = { file: 'dist/cli/index.js', format, sourcemap: true };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions, {});
};
