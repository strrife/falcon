const rollupCjsBuild = process.env.ROLLUP !== undefined;

module.exports = {
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
    [require.resolve('@babel/plugin-transform-runtime'), { useESModules: !rollupCjsBuild }],
    [require.resolve('@babel/plugin-proposal-object-rest-spread'), { loose: true, useBuiltIns: true }],
    require.resolve('babel-plugin-annotate-pure-calls')
  ].filter(Boolean)
};
