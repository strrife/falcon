const workbox = require('workbox-build');
const Logger = require('@deity/falcon-logger');

async function getManifestEntries() {
  try {
    const configuration = {
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
      globDirectory: '.',
      globPatterns: ['build/public/**/*.{js,json,html,css,ico,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
      modifyURLPrefix: { 'build/public': '' },
      templatedURLs: {
        '/app-shell': ['build/public/static/@(js|css)/@(client|vendor|bundle)*.@(js|css)', 'build/server.js']
      },
      dontCacheBustURLsMatching: /\/static\/.*/
    };

    const { manifestEntries, size, warnings } = await workbox.getManifest(configuration);

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
