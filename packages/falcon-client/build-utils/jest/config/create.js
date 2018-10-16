const fs = require('fs');
const path = require('path');
const paths = require('./../../webpack/config/paths');

module.exports = rootDir => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? '<rootDir>/src/setupTests.js'
    : require.resolve('./setupTests');

  let config = {
    rootDir,
    setupTestFrameworkScriptFile: setupTestsFile,
    testEnvironment: 'node',
    testURL: 'http://localhost',
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs,ts,tsx}'
    ],
    transform: {
      '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
      '^.+\\.(ts|tsx)$': 'ts-jest/preprocessor.js',
      '^.+\\.(js|jsx|mjs)$': path.resolve(__dirname, 'babelTransform.js'),
      '^.+\\.css$': path.resolve(__dirname, 'cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': path.resolve(__dirname, 'fileTransform.js')
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
      '^src(.*)$': '<rootDir>/src$1',
      '^react-native$': 'react-native-web'
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,mjs,ts,tsx}'],
    coverageReporters: ['html', 'text', 'text-summary']
  };

  // eslint-disable-next-line
  const packageJson = require(paths.appPackageJson);
  if (packageJson.jest) {
    config = {
      ...config,
      ...packageJson.jest
    };
  }

  return config;
};
