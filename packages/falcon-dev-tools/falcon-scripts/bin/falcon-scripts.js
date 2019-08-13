#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

const fs = require('fs-extra');
const { paths } = require('../src/tools');
const esm = require('../src/build-esm');

(async () => {
  const script = process.argv[2];
  const packagePath = process.cwd();

  try {
    switch (script) {
      case 'build': {
        const buildDts = require('../src/build-dts');
        const buildCjs = require('../src/build-cjs');

        buildDts({ packagePath });
        esm.build({ packagePath });
        await buildCjs.main({ packagePath });

        if (fs.existsSync(paths.pkgBinSrc)) {
          await buildCjs.bin({ packagePath });
        }

        break;
      }

      case 'watch': {
        esm.watch();

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
        console.log(`Unknown script "${script}".`);
        console.log('Perhaps you need to update @deity/falcon-scripts?');
        process.exit();

        break;
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
