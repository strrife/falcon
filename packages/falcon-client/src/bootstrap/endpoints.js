import url from 'url';
import fetch from 'node-fetch';
import proxies from 'koa-proxies';
import Logger from '@deity/falcon-logger';

/**
 * Bootstrap hook to fetch list of endpoints from Falcon-Server
 * and set up a "proxy" handler
 * @param {koa-router} router KoaRouter object
 * @param {string} serverUrl Falcon-Server URL
 * @param {string} successRedir Redirect on success
 * @param {boolean} isDebug Debug flag
 */
export const endpoints = (router, serverUrl, successRedir, isDebug = process.env.NODE_ENV !== 'production') => {
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
      if (data.length) {
        Logger.debug('Adding endpoints for proxying:', data);
      }

      data.forEach(endpoint => {
        // using "endpoint" value as a proxied route name
        router.all(
          endpoint,
          endpoint,
          proxies(endpoint, {
            target: url.resolve(serverUrl, '/'),
            changeOrigin: true,
            logs: isDebug,
            events: {
              proxyRes: (proxyRes, req, res) => {
                // Hiding "not found" page output from the backend
                if (proxyRes.statusCode === 404) {
                  res.end(proxyRes.statusMessage);
                }

                // Success redirection
                if ([200, 302].indexOf(proxyRes.statusCode) !== false) {
                  res.statusCode = 302;
                  res.setHeader('Location', successRedir);
                  res.end();
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
