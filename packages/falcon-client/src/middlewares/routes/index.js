import apolloClientProvider from './apolloClientProvider';
import ssr from './ssrMiddleware';
import appShell from './appShellMiddleware';
import appHtml from './appHtmlMiddleware';
import i18next from './i18nextMiddleware';

/**
 * @typedef {object} RenderAppShell
 * @property {object} config App configuration
 * @property {object} webpackAssets webpack assets
 */

/**
 * Configure App Shell rendering middlewares
 * @param {RenderAppShell} params params
 * @returns {function(ctx: object, next: function)[]} Koa middlewares
 */
export function renderAppShell({ config, webpackAssets }) {
  const { apolloClient } = config;
  const configSchema = { data: { config } };

  return [
    apolloClientProvider({ config: apolloClient, clientStates: { configSchema } }),
    appShell({ webpackAssets }),
    appHtml({ webpackAssets, config })
  ];
}

/**
 * @typedef {object} RenderApp
 * @property {function} App React Component
 * @property {object} config App configuration
 * @property {object} clientApolloSchema Apollo State object
 * @property {object} webpackAssets webpack assets
 */

/**
 * Configure App rendering middlewares
 * @param {RenderApp} params params
 * @returns {function(ctx: object, next: function)[]} Koa middlewares
 */
export function renderApp({ config, clientApolloSchema, App, webpackAssets }) {
  const { i18n, serverSideRendering, apolloClient } = config;
  const configSchema = { data: { config } };

  return [
    apolloClientProvider({
      config: apolloClient,
      clientStates: {
        configSchema,
        clientApolloSchema
      }
    }),
    i18next({ ...i18n }),
    serverSideRendering ? ssr({ App, webpackAssets }) : appShell({ webpackAssets }),
    appHtml({ webpackAssets, config })
  ].filter(x => x);
}
