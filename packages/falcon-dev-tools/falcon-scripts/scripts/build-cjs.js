const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const Logger = require('@deity/falcon-logger');

const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false;
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

async function build() {
  Logger.log(`building cjs...`);

  process.env.ROLLUP = true;

  const packagePath = process.cwd();

  // eslint-disable-next-line
  const pkg = require(path.join(packagePath, './package.json'));

  const externals = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const inputOptions = {
    input: path.join(packagePath, 'src/index.ts'),
    external: makeExternalPredicate(externals),
    plugins: [
      resolve({
        extensions
      }),
      babel({
        extensions,
        runtimeHelpers: true,
        ...require('./babel.config')
      })
    ]
  };
  const outputOptions = { file: pkg.main, format: 'cjs', sourcemap: true };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

module.exports = {
  build
};
