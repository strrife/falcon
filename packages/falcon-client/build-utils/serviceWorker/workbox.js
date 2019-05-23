const workbox = require('workbox-build');
const Logger = require('@deity/falcon-logger');

async function getManifestEntries() {
  try {
    const configuration = {
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
      globDirectory: '.',
      globPatterns: ['build/public/**/*.{js,json,html,css,ico,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
      modifyUrlPrefix: { 'build/public': '' },
      templatedUrls: {
        '/app-shell': ['build/public/static/@(js|css)/@(client|vendor|bundle)*.@(js|css)', 'build/server.js']
      },
      dontCacheBustUrlsMatching: /\/static\/.*/
    };

    const { manifestEntries, size, warnings } = await workbox.getManifest(configuration);
    console.log(JSON.stringify(manifestEntries, null, 2));

    // const { count, size, warnings } = await workbox.injectManifest(configuration);
    // Logger.log(
    //   `Generated Service Worker ${swLocation} which will precache ${count} files, totaling ${formatBytes(size)}.\n`
    // );
    if (warnings.length) {
      Logger.warn(warnings.join('\n'));
    }

    return { manifestEntries, size };
  } catch (error) {
    Logger.error('Service Worker pre-cache entries generation failed!');

    throw error;
  }
}

module.exports = {
  getManifestEntries
};
