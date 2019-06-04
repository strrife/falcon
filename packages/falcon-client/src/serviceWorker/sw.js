import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { registerNavigationRoute } from 'workbox-routing';
import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';

setCacheNameDetails({ prefix: '@deity' });
skipWaiting();
clientsClaim();

const ENTRIES = [];
precacheAndRoute(ENTRIES, {});

// registerRoute(({ event }) => event.request.mode === 'navigate', () => caches.match('/app-shell'));
// workbox.routing.registerRoute('/', workbox.strategies.networkFirst(), 'GET');

registerNavigationRoute(getCacheKeyForURL('app-shell'));

// workbox.routing.setCatchHandler(({ url, event, params }) => {
//   // In the case of any of routes throwing an error, capture and degrade gracefully
// });
