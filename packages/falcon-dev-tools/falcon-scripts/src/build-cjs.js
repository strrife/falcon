const path = require('path');
const glob = require('glob');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const Logger = require('@deity/falcon-logger');

const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false;
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

module.exports.pkg = async ({ packagePath }) => {
  Logger.log('building cjs...');

  process.env.ROLLUP = true;
  // process.env.TARGET = 'NODE';

  const inputFiles = glob.sync(`${path.join(packagePath, 'src', 'index')}@(*.js|*.jsx|*.ts|*.tsx)`);
  if (inputFiles.length !== 1) {
    throw new Error('Directory "/src" should contain single "index" file!');
  }

  // eslint-disable-next-line
  const packageJson = require(path.join(packagePath, './package.json'));
  const externals = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {})
  ];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const format = 'cjs';
  const inputOptions = {
    input: inputFiles[0],
    external: makeExternalPredicate(externals),
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
  const outputOptions = { file: packageJson.main, format, sourcemap: true };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
};

module.exports.cli = async ({ packagePath }) => {
  console.log('building cli...');

  process.env.ROLLUP = true;
  // process.env.TARGET = 'NODE';

  // eslint-disable-next-line
  const packageJson = require(path.join(packagePath, './package.json'));

  const directory = path.join('src', 'cli');
  const inputFiles = glob.sync(`${path.join(packagePath, directory, 'index')}@(*.js|*.jsx|*.ts|*.tsx)`);
  if (inputFiles.length === 0) {
    // nothing to compile
    return;
  }
  if (inputFiles.length !== 1) {
    throw new Error(`'Directory '${directory}' should contain single 'index.*' file!`);
  }

  const externals = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {})
  ];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const format = 'cjs';
  const inputOptions = {
    input: inputFiles[0],
    external: makeExternalPredicate(externals),
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
  const outputOptions = { file: 'dist/cli/index.js', format, sourcemap: 'inline' };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions, {});
};
