import 'app-webmanifest';
import '@babel/polyfill';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { loadableReady } from '@loadable/component';
import { I18nProvider } from '@deity/falcon-i18n';
import { ApolloClient, apolloStateToObject } from './service';
import HtmlHead from './components/HtmlHead';
import App, { clientApolloSchema } from './clientApp';
import i18nFactory from './i18n/i18nClientFactory';
import { configureServiceWorker } from './serviceWorker';

// eslint-disable-next-line no-underscore-dangle
const apolloInitialState = window.__APOLLO_STATE__ || {};
const i18nextState = window.I18NEXT_STATE || {};

const config = apolloStateToObject(apolloInitialState, '$ROOT_QUERY.config');
const apolloClient = new ApolloClient({
  isBrowser: true,
  clientState: clientApolloSchema,
  initialState: apolloInitialState,
  apolloClientConfig: config.apolloClient
});

i18nFactory({ ...config.i18n, lng: i18nextState.language }).then(i18next => {
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
  const renderApp = config.serverSideRendering ? hydrate : render;

  loadableReady(() => {
    renderApp(markup, document.getElementById('root'));
  });

  configureServiceWorker();
});

if (module.hot) {
  module.hot.accept();
}
