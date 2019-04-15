#!/usr/bin/env node

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception: ', ex);
});

const Logger = require('@deity/falcon-logger');
const spawn = require('cross-spawn');
const path = require('path');

const buildEsm = require('../scripts/build-esm');
const buildCjs = require('../scripts/build-cjs');
const buildTsDeclarations = require('../scripts/build-tsDeclarations');

(async () => {
  const script = process.argv[2];
  const args = process.argv.slice(3);
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
        const configRelativePath = path.relative(packagePath, require.resolve('../babel.config.js'));

        const result = spawn.sync(
          `babel src -d dist -x .ts,.tsx -s --watch --config-file ${configRelativePath}`,
          [...args],
          { stdio: 'inherit' }
        );
        process.exit(result.status);

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
