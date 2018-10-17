#!/usr/bin/env node
const Logger = require('@deity/falcon-logger');
const webpack = require('./../build-utils/webpack');
const workbox = require('./../src/buildTools/workbox');
const jest = require('./../build-utils/jest');

(async () => {
  const script = process.argv[2];
  // const args = process.argv.slice(3);

  try {
    switch (script) {
      case 'start': {
        await webpack.startDevServer();
        break;
      }
      case 'build': {
        await webpack.build();
        await workbox.injectManifest();
        break;
      }
      case 'test': {
        jest();
        break;
      }
      default:
        Logger.log(`Unknown script "${script}".`);
        Logger.log('Perhaps you need to update @deity/falcon-client?');
        process.exit();

        break;
    }
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
})();
