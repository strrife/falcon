import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false;
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

process.env.ROLLUP = true;

const packagePath = process.cwd();

// eslint-disable-next-line
const pkg = require(path.join(packagePath, './package.json'));

const externals = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default {
  input: 'src/index.ts',
  external: makeExternalPredicate(externals),
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      runtimeHelpers: true,
      ...require('./babel.config')
    })
  ],
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }]
};
