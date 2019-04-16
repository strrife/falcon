#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

const Logger = require('@deity/falcon-logger');
const buildEsm = require('../scripts/build-esm');
const buildCjs = require('../scripts/build-cjs');
const buildTsDeclarations = require('../scripts/build-tsDeclarations');
const watchBuild = require('../scripts/watch-build');
const watchTest = require('../scripts/watch-test');
const testCoverage = require('../scripts/test-coverage');

(async () => {
  const script = process.argv[2];
  // const args = process.argv.slice(3);
  const packagePath = process.cwd();

  try {
    switch (script) {
      case 'build-package': {
        buildEsm({ packagePath });
        buildTsDeclarations({ packagePath });
        await buildCjs({ packagePath });

        break;
      }
      case 'watch': {
        watchBuild();
        break;
      }

      case 'test': {
        await watchTest({ packagePath });
        break;
      }

      case 'test:coverage': {
        await testCoverage({ packagePath });
        break;
      }

      default:
        Logger.log(`Unknown script "${script}".`);
        Logger.log('Perhaps you need to update @deity/falcon-scripts?');
        process.exit();

        break;
    }

    process.exit(0);
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
})();
