module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServerPort: 3001,
  clearConsole: false,
  useWebmanifest: true,
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {}
};
