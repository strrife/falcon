module.exports = {
  clearConsole: true,
  useWebmanifest: true,
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {
    '@deity/falcon-ui/dist/components/Text': '@deity/falcon-ecommerce-uikit/dist/Footer/Text',
    '@deity/falcon-ecommerce-uikit/dist/Footer/Text': 'src/components/RedText'
  }
};
