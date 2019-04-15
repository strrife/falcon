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
const glob = require('glob');

(async () => {
  const script = process.argv[2];
  const args = process.argv.slice(3);

  try {
    switch (script) {
      case 'build-package': {
        const projectPath = process.cwd();

        const babelConfigPath = path.relative(projectPath, require.resolve('../src/build-package/babel.config.js'));
        const result = spawn.sync(`babel src -d dist -x .ts,.tsx -s --config-file ${babelConfigPath}`, [], {
          stdio: 'inherit'
        });
        if (result.status !== 0) {
          process.exit(result.status);
        }

        // const tsConfigPath = require.resolve('../src/build-package/tsconfig.json');

        const tsCompilerOptions = [
          '--outDir dist',
          '--declarationDir dist',
          '--target esnext',
          '--module esnext',
          '--moduleResolution node',
          '--allowSyntheticDefaultImports',
          '--esModuleInterop',
          '--jsx react',
          '--strict',
          '--noFallthroughCasesInSwitch',
          '--noImplicitReturns',
          '--noUnusedParameters',
          '--sourceMap',
          '--skipLibCheck',
          '--declaration',
          '--emitDeclarationOnly',
          '--declarationMap',
          '--forceConsistentCasingInFileNames',
          '--pretty'
        ];

        const files = glob.sync(`${path.join(projectPath, 'src')}@(.*)`);
        const result2 = spawn.sync(`tsc ${tsCompilerOptions.join(' ')} ${files.join(' ')}`, [], {
          stdio: 'inherit'
        });
        if (result2.status !== 0) {
          process.exit(result2.status);
        }

        const rollupConfigPath = path.relative(projectPath, require.resolve('../src/build-package/rollup.config.js'));
        const result3 = spawn.sync(`rollup --config ${rollupConfigPath}`, [], { stdio: 'inherit' });
        if (result3.status !== 0) {
          process.exit(result3.status);
        }

        process.exit(0);

        break;
      }
      case 'watch': {
        const projectPath = process.cwd();
        const configRelativePath = path.relative(projectPath, require.resolve('../src/build-package/babel.config.js'));

        const result = spawn.sync(
          `babel src -d dist -x .ts,.tsx -s --watch --config-file ${configRelativePath}`,
          [...args],
          { stdio: 'inherit' }
        );
        process.exit(result.status);

        break;
      }
      // build: tsDeclarations": "tsc",

      default:
        Logger.log(`Unknown script "${script}".`);
        Logger.log('Perhaps you need to update @deity/falcon-scripts?');
        process.exit();

        break;
    }
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
})();
