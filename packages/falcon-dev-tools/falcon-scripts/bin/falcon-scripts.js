#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

const fs = require('fs-extra');
const { paths } = require('../src/tools');
const dts = require('../src/build-dts');
const esm = require('../src/build-esm');
const test = require('../src/test');

(async () => {
  const script = process.argv[2];
  const packagePath = process.cwd();

  try {
    switch (script) {
      case 'build': {
        const cjs = require('../src/build-cjs');

        await Promise.all(
          [
            dts.build({ packagePath }),
            esm.build({ packagePath }),
            cjs.main({ packagePath }),
            fs.existsSync(paths.pkgBinSrc) && cjs.bin({ packagePath })
          ].filter(x => x)
        );

        break;
      }

      case 'watch': {
        await Promise.all([dts.watch({ packagePath }), esm.watch()]);

        break;
      }

      case 'clean': {
        const clean = require('../src/clean');

        await clean();
        break;
      }

      case 'test': {
        await test.watch({ packagePath });
        break;
      }

      case 'test:coverage': {
        await test.coverage({ packagePath });
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
