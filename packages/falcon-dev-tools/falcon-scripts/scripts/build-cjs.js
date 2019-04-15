const path = require('path');
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

module.exports = async ({ packagePath }) => {
  Logger.log('building cjs...');

  process.env.ROLLUP = true;

  // eslint-disable-next-line
  const pkg = require(path.join(packagePath, './package.json'));

  const externals = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const babelConfig = {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          loose: true,
          targets: 'defaults'
        }
      ],
      require.resolve('@babel/preset-typescript'),
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve('babel-plugin-graphql-tag'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      [require.resolve('@babel/plugin-transform-runtime'), { useESModules: false }],
      [require.resolve('@babel/plugin-proposal-object-rest-spread'), { loose: true, useBuiltIns: true }],
      require.resolve('babel-plugin-annotate-pure-calls')
    ].filter(Boolean)
  };

  const inputOptions = {
    input: path.join(packagePath, 'src/index.ts'),
    external: makeExternalPredicate(externals),
    plugins: [
      nodeResolve({
        extensions
      }),
      babel({
        extensions,
        runtimeHelpers: true,
        ...babelConfig
      }),
      commonjs()
    ]
  };
  const outputOptions = { file: pkg.main, format: 'cjs', sourcemap: true };

  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
};
