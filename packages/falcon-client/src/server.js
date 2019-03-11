import Koa from 'koa';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import compress from 'koa-compress';
import url from 'url';
import Logger from '@deity/falcon-logger';
import error500 from './middlewares/error500Middleware';
import serverTiming from './middlewares/serverTimingMiddleware';
import graphqlProxy from './middlewares/graphqlProxyMiddleware';
import { renderAppShell, renderApp } from './middlewares/routes';

/**
 * Creates an instance of Falcon web server
 * @param {ServerAppConfig} props Application parameters
 * @return {WebServer} Falcon web server
 */
export function Server({ App, clientApolloSchema, bootstrap, webpackAssets, port, loadableStats }) {
  const { config } = bootstrap;
  Logger.setLogLevel(config.logLevel);

  const instance = new Koa();
  bootstrap.onServerCreated(instance);

  const publicDir = process.env.PUBLIC_DIR;
  const router = new Router();

  const httpLinkUri = config.apolloClient && config.apolloClient.httpLink && config.apolloClient.httpLink.uri;
  if (httpLinkUri) {
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

    router.all(httpUrl.pathname, graphqlProxy(serverUri));
  }

  router.get('/sw.js', serve(publicDir, { maxage: 0 }));
  router.get('/static/*', serve(publicDir, { maxage: process.env.NODE_ENV === 'production' ? 31536000000 : 0 }));
  router.get('/*', serve(publicDir));
  router.get('/app-shell', ...renderAppShell({ config, webpackAssets, loadableStats }));
  router.get('/*', ...renderApp({ App, clientApolloSchema, config, webpackAssets, loadableStats }));

  instance
    .use(helmet())
    .use(error500())
    .use(serverTiming())
    .use(compress())
    .use(router.routes())
    .use(router.allowedMethods());

  bootstrap.onServerInitialized(instance);

  return {
    instance,
    callback: () => instance.callback(),
    started: () => bootstrap.onServerStarted(instance)
  };
}

/**
 * @typedef {object} ServerAppConfig
 * @property {function} App Root application component
 * @property {{config, onServerCreated, onServerInitialized, onServerStarted }} bootstrap Initial configuration
 * @property {object} clientApolloSchema Apollo State object
 * @property {object} webpackAssets webpack assets
 */

/**
 * @typedef {object} WebServer
 * @property {Koa} instance Server instance
 * @property {function} callback Initial configuration
 * @property {object} clientApolloSchema Apollo State object
 */
