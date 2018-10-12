const { razzlePluginFalconClient } = require('@deity/falcon-client');

module.exports = {
  clearConsole: false,
  plugins: [
    razzlePluginFalconClient({
      i18n: {
        resourcePackages: ['@deity/falcon-i18n'],
        filter: { lng: ['en'] }
      }
    })
  ]
};
