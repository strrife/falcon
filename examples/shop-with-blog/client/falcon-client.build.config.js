module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServer: {
    host: 'localhost',
    port: 3001
  },
  clearConsole: false,
  useWebmanifest: true,
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {}
};
