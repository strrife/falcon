import url from 'url';
import fetch from 'node-fetch';
import proxies from 'koa-proxies';
import Logger from '@deity/falcon-logger';

export const endpoints = (router, serverUrl, isDebug = process.env.NODE_ENV !== 'production') => {
  if (!serverUrl) {
    Logger.warn('"serverUrl" must be passed in your "bootstrap.js" file.');
    return;
  }
  const endpointsConfig = url.resolve(serverUrl, '/endpoints');
  fetch(endpointsConfig)
    .then(result => {
      if (!result.ok) {
        throw new Error(`${result.url} - ${result.status} ${result.statusText}`);
      }
      return result.json();
    })
    .then(data => {
      Logger.debug('Adding endpoints for proxying:', data);

      data.forEach(endpoint => {
        // using "endpoint" value as a proxied route name
        router.all(
          endpoint,
          endpoint,
          proxies(endpoint, {
            target: url.resolve(serverUrl, endpoint),
            changeOrigin: true,
            logs: isDebug,
            events: {
              proxyRes: (proxyRes, req, res) => {
                // Hiding "not found" page output from the backend
                if (proxyRes.statusCode === 404) {
                  res.end(proxyRes.statusMessage);
                }
              }
            }
          })
        );

        const route = router.route(endpoint);
        const routeIndex = router.routes().router.stack.indexOf(route);
        // Rearranging proxied routes - we have to make sure
        // these routes are added at the beginning of the route stack
        router.routes().router.stack.splice(routeIndex, 1);
        router.routes().router.stack.unshift(route);
      });
    })
    .catch(error => {
      Logger.warn(`Failed to fetch "endpoints" from Falcon-Server: ${error.message}`);
    });
};
