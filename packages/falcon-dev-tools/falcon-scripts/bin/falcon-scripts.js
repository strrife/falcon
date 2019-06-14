#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

(async () => {
  const script = process.argv[2];
  const args = process.argv.slice(3) || [];
  const packagePath = process.cwd();

  try {
    switch (script) {
      case 'build': {
        const target =
          (args.find(x => x.startsWith('--target=')) || '')
            .split('=')
            .pop()
            .toUpperCase() || undefined;

        const buildDts = require('../src/build-dts');
        const buildEsm = require('../src/build-esm');
        const buildCjs = require('../src/build-cjs');

        buildDts({ packagePath });
        buildEsm({ packagePath, target });
        if (target !== 'NODE') {
          await buildCjs({ packagePath, target });
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
