/* eslint no-restricted-globals: 0 */

import { setCacheNameDetails /* , cacheNames */ } from 'workbox-core';
import { registerNavigationRoute /* , Router, NavigationRoute */ } from 'workbox-routing';
import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';

/**
 * `message` event handler
 * @param {Event} event event
 */
function onMessage(event) {
  const { data } = event;

  if (data && data.type) {
    switch (data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;

      default:
        break;
    }
  }
}

self.addEventListener('message', onMessage);

setCacheNameDetails({ prefix: '@deity' });

const ENTRIES = [];
precacheAndRoute(ENTRIES, {});

registerNavigationRoute(getCacheKeyForURL('app-shell'));

// workbox.routing.setCatchHandler(({ url, event, params }) => {
//   // In the case of any of routes throwing an error, capture and degrade gracefully
// });

// my custom navigation Route needs to be improved
//
// const router = new Router();
// self.addEventListener('fetch', event => {
//   const responsePromise = router.handleRequest(event);
//   if (responsePromise) {
//     // Router found a route to handle the request
//     event.respondWith(responsePromise);
//   } else {
//     // No route found to handle the request
//   }
// });

// router.registerRoute(
//   new NavigationRoute(async () => {
//     debugger;
//     // check if SW is waiting and try to activate it if only one client
//     if (self.registration.waiting) {
//       const clients = await self.clients.matchAll();
//       if (clients.length <= 1) {
//         console.log(`clients.length === ${clients.length}, so skip waiting`);
//         debugger;
//         // registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined });
//         // return self.skipWaiting().then(() => new Response('', { headers: { Refresh: '0' } }));
//         // self.registration.waiting.postMessage('skipWaiting');

//         // return new Response('', { headers: { Refresh: '5' } });

//         return self
//           .skipWaiting()
//           .then(() => new Response('', { headers: { Refresh: '0' } }))
//           .catch(e => console.log(e));
//         // registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined });
//         // return new Response('', { headers: { Refresh: '0' } });
//       }
//     }

//     // debugger;
//     const cachedAssetUrl = getCacheKeyForURL('app-shell');
//     try {
//       const response = await caches.match(cachedAssetUrl, { cacheName: cacheNames.precache });

//       if (response) {
//         return response;
//       }

//       // This shouldn't normally happen, but there are edge cases: https://github.com/GoogleChrome/workbox/issues/1441
//       throw new Error(`The cache ${cacheNames.precache} did not have an entry for ${cachedAssetUrl}.`);
//     } catch (error) {
//       // If there's either a cache miss, or the caches.match() call threw
//       // an exception, then attempt to fulfill the navigation request with
//       // a response from the network rather than leaving the user with a
//       // failed navigation.
//       console.log(`Unable to respond to navigation request with cached response. Falling back to network.`, error);

//       // This might still fail if the browser is offline...
//       return fetch(cachedAssetUrl);
//     }
//   })
// );
