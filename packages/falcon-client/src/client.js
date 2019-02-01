import 'app-webmanifest';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { loadableReady } from '@loadable/component';
import { I18nProvider } from '@deity/falcon-i18n';
import { CachePersistor } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloClient, apolloStateToObject } from './service';
import HtmlHead from './components/HtmlHead';
import App, { clientApolloSchema } from './clientApp';
import i18nFactory from './i18n/i18nClientFactory';
import { register, unregisterAll } from './serviceWorker';

// eslint-disable-next-line no-underscore-dangle
const apolloInitialState = window.__APOLLO_STATE__ || {};
const i18nextState = window.I18NEXT_STATE || {};

const config = apolloStateToObject(apolloInitialState, '$ROOT_QUERY.config');

const cacheKey = '@deity/falcon-client/apollo-cache';
const cache = new InMemoryCache({ addTypename: false }); // .restore(apolloInitialState);
const persistor = new CachePersistor({
  cache,
  storage: window.localStorage,
  key: cacheKey,
  debounce: 1000,
  debug: true
});

const restoreCache = cachePersistor => {
  const { navigator } = window;
  const online = navigator && navigator.onLine;

  if (online) {
    cachePersistor.purge().then(() => {
      cache.restore(apolloInitialState);
      return Promise.resolve();
    });
  }

  return cachePersistor.restore();
};

const renderApp = config.serverSideRendering ? hydrate : render;

loadableReady()
  .then(() => restoreCache(persistor))
  .then(() => i18nFactory({ ...config.i18n, lng: i18nextState.language }))
  .then(i18next => {
    const apolloClient = new ApolloClient({
      isBrowser: true,
      clientState: clientApolloSchema,
      initialState: apolloInitialState,
      apolloClientConfig: config.apolloClient,
      cache
    });

    const markup = (
      <ApolloProvider client={apolloClient}>
        <I18nProvider i18n={i18next}>
          <BrowserRouter>
            <React.Fragment>
              <HtmlHead htmlLang={i18nextState.language || config.i18n.lng} />
              <App />
            </React.Fragment>
          </BrowserRouter>
        </I18nProvider>
      </ApolloProvider>
    );
    renderApp(markup, document.getElementById('root'));
  })
  .then(() => {
    if (process.env.NODE_ENV === 'production') {
      register('/sw.js');
    } else {
      unregisterAll();
    }
  });

if (module.hot) {
  module.hot.accept();
}
