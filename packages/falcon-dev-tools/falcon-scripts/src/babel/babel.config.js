const { NODE_ENV, TARGET, ROLLUP } = process.env;

const targetNode = TARGET === 'NODE';
const envTest = NODE_ENV === 'test';
const rollupCjsBuild = ROLLUP !== undefined;
const useESModules = !(rollupCjsBuild || targetNode || envTest);

module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        loose: true,
        targets: targetNode ? { node: true } : 'defaults'
      }
    ],
    require.resolve('@babel/preset-typescript'),
    require.resolve('@babel/preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-graphql-tag'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    [require.resolve('@babel/plugin-transform-runtime'), { useESModules }],
    [require.resolve('@babel/plugin-proposal-object-rest-spread'), { loose: true, useBuiltIns: true }],
    ...(targetNode || envTest
      ? [
          require.resolve('babel-plugin-dynamic-import-node'),
          [require.resolve('@babel/plugin-transform-modules-commonjs'), { loose: true }]
        ]
      : [require.resolve('babel-plugin-annotate-pure-calls')]),
    ...(envTest ? [require.resolve('@babel/plugin-transform-react-jsx-source')] : [])
  ].filter(Boolean)
};
