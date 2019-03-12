import Logger from '@deity/falcon-logger';
import fetch from 'node-fetch';
import url from 'url';

// GraphQL Proxy to Falcon-Server
export default (config, router, port) => {
  const { apolloClient } = config;
  const httpLinkUri = apolloClient && apolloClient.httpLink && apolloClient.httpLink.uri;

  const httpUrl = url.parse(httpLinkUri);
  const serverUri = url.format({
    protocol: httpUrl.protocol,
    auth: httpUrl.auth,
    host: httpUrl.host
  });

  // Switching Apollo Http Link URI to the "localhost" address
  // so ApolloClient would be talking to the "own" host
  config.apolloClient.httpLink.uri = url.format({
    pathname: httpUrl.pathname,
    protocol: 'http',
    port,
    hostname: 'localhost'
  });

  Logger.debug(`Registering api proxy for "${httpUrl.pathname}"`);

  router.all(httpUrl.pathname, async ctx => {
    const { request, originalUrl } = ctx;
    const { method, header } = request;

    const result = await fetch(`${serverUri}${originalUrl}`, {
      method,
      headers: header,
      body: method === 'POST' ? ctx.req : undefined
    });

    result.headers.forEach((value, name) => {
      ctx.set(name, value);
    });

    // https://github.com/bitinn/node-fetch/blob/master/src/headers.js#L120
    // node-fetch returns `set-cookie` headers concatenated with ", " (which is invalid)
    // for this reason we get a list of "raw" headers and set them to the response
    ctx.set('set-cookie', result.headers.raw()['set-cookie'] || []);

    ctx.status = result.status;
    ctx.body = result.body;
  });
};
