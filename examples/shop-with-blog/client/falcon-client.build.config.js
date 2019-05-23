const config = require('config');

module.exports = {
  devServerPort: (config.port || 3000) + 1,
  CI: process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false'),
  clearConsole: false,
  useWebmanifest: true,
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {
    // Banner replacement works
    '@deity/falcon-ecommerce-uikit/dist/Header/Banner': 'src/components/Header/Banner'

    // and those 2 below don't work:
    // '@deity/falcon-ecommerce-uikit/dist/Header': 'src/components/Header'
    // '@deity/falcon-ecommerce-uikit/dist/Header/Header': 'src/components/Header/Header'
  }
};
