#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

const Logger = require('@deity/falcon-logger');
const fs = require('fs-extra');
const { paths } = require('../src/tools');

(async () => {
  const script = process.argv[2];
  const packagePath = process.cwd();

  try {
    switch (script) {
      case 'build': {
        const buildDts = require('../src/build-dts');
        const buildEsm = require('../src/build-esm');
        const buildCjs = require('../src/build-cjs');

        buildDts({ packagePath });
        buildEsm({ packagePath });
        await buildCjs.pkg({ packagePath });

        if (fs.existsSync(paths.pkgBinSrc)) {
          await buildCjs.cli({ packagePath });
        }

        break;
      }

      case 'watch': {
        const watchBuild = require('../src/watch-build');

        watchBuild();
        break;
      }

      case 'clean': {
        const clean = require('../src/clean');

        await clean();
        break;
      }

      case 'test': {
        const watchTest = require('../src/watch-test');

        await watchTest({ packagePath });
        break;
      }

      case 'test:coverage': {
        const testCoverage = require('../src/test-coverage');

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
