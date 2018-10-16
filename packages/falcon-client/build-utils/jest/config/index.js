const fs = require('fs');
const path = require('path');
const paths = require('./../../../src/buildTools/webpack/config/paths');

module.exports = rootDir => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup) ? '<rootDir>/src/setupTests.js' : undefined;

  // eslint-disable-next-line
  const packageJson = require(paths.appPackageJson);

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    rootDir,
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,mjs,ts,tsx}'],
    coverageReporters: ['html', 'text', 'text-summary'],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs,,ts,tsx}'
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
      '^.+\\.(ts|tsx)$': 'ts-jest/preprocessor.js',
      '^.+\\.(js|jsx|mjs)$': path.resolve(__dirname, 'babelTransform.js'),
      '^.+\\.css$': path.resolve(__dirname, 'cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': path.resolve(__dirname, 'fileTransform.js')
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleNameMapper: {
      '^react-native$': 'react-native-web'
    },
    ...packageJson.jest
  };

  return config;
};
