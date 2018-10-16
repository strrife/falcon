const fs = require('fs');
const chalk = require('chalk');
const paths = require('./../../../src/buildTools/webpack/config/paths');

/* eslint-disable */

module.exports = (resolve, rootDir) => {
  console.log(`resolve: ${resolve('.')}`);
  console.log(`rootDir: ${rootDir}`);

  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup) ? '<rootDir>/src/setupTests.js' : undefined;

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
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
      '^.+\\.(js|jsx|mjs)$': resolve('babelTransform.js'),
      '^.+\\.css$': resolve('cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': resolve('fileTransform.js')
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleNameMapper: {
      '^react-native$': 'react-native-web'
    }
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  const overrides = Object.assign({}, require(paths.appPackageJson).jest);
  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'moduleFileExtensions',
    'moduleNameMapper',
    'modulePaths',
    'snapshotSerializers',
    'setupFiles',
    'testMatch',
    'testEnvironmentOptions',
    'testResultsProcessor',
    'transform',
    'transformIgnorePatterns'
  ];
  if (overrides) {
    supportedKeys.forEach(key => {
      if (overrides.hasOwnProperty(key)) {
        config[key] = overrides[key];
        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    if (unsupportedKeys.length) {
      console.error(
        chalk.red(
          `${'Out of the box, Razzle only supports overriding ' + 'these Jest options:\n\n'}${supportedKeys
            .map(key => chalk.bold(`  \u2022 ${key}`))
            .join('\n')}.\n\n` +
            `These options in your package.json Jest configuration ` +
            `are not currently supported by Razzle:\n\n${unsupportedKeys
              .map(key => chalk.bold(`  \u2022 ${key}`))
              .join('\n')}`
        )
      );
      process.exit(1);
    }
  }
  return config;
};
