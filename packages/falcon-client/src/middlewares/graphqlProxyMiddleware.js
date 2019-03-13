import Logger from '@deity/falcon-logger';
import url from 'url';
import { ProxyRequest } from '../service/ProxyRequest';

// GraphQL Proxy to Falcon-Server
export default (config, port) => {
  const { apolloClient } = config;
  const httpLinkUri = apolloClient && apolloClient.httpLink && apolloClient.httpLink.uri;

  // Switching Apollo Http Link URI to the "localhost" address
  // so ApolloClient would be talking to the "own" host
  config.apolloClient.httpLink.uri = url.format({
    protocol: 'http',
    hostname: 'localhost',
    port,
    pathname: '/graphql'
  });

  Logger.debug(`Registering api proxy for "/graphql" to "${httpLinkUri}"`);

  return async ctx => {
    const result = await ProxyRequest(httpLinkUri, ctx);
    ctx.status = result.status;
    ctx.body = result.body;
  };
};
