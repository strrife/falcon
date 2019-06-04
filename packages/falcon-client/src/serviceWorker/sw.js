/* global workbox, importScripts */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.setCacheNameDetails({ prefix: '@deity' });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const ENTRIES = [];
workbox.precaching.precacheAndRoute(ENTRIES, {});

// workbox.routing.registerRoute(({ event }) => event.request.mode === 'navigate', () => caches.match('/app-shell'));
// workbox.routing.registerRoute('/', workbox.strategies.networkFirst(), 'GET');

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('app-shell'));

// workbox.routing.setCatchHandler(({ url, event, params }) => {
//   // In the case of any of routes throwing an error, capture and degrade gracefully
// });
