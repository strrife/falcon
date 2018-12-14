import 'app-webmanifest';
import React from 'react';
import { hydrate, render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ApolloProvider } from 'react-apollo';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper2';
import { I18nProvider } from '@deity/falcon-i18n';
import { ApolloClient, apolloStateToObject } from './service';
import HtmlHead from './components/HtmlHead';
import App, { clientApolloSchema } from './clientApp';
import i18nFactory from './i18n/i18nClientFactory';
import { register, unregisterAll } from './serviceWorker';

// eslint-disable-next-line no-underscore-dangle
const apolloInitialState = window.__APOLLO_STATE__ || {};
const asyncComponentState = window.ASYNC_COMPONENTS_STATE;
const i18nextState = window.I18NEXT_STATE || {};

const config = apolloStateToObject(apolloInitialState, '$ROOT_QUERY.config');
const apolloClient = new ApolloClient({
  isBrowser: true,
  clientState: clientApolloSchema,
  initialState: apolloInitialState,
  apolloClientConfig: config.apolloClient
});

i18nFactory({ ...config.i18n, lng: i18nextState.language }).then(i18next => {
  const renderApp = config.serverSideRendering
    ? (element, container, callback) => asyncBootstrapper(element).then(() => hydrate(element, container, callback))
    : render;

  const markup = (
    <ApolloProvider client={apolloClient}>
      <AsyncComponentProvider rehydrateState={asyncComponentState}>
        <I18nProvider i18n={i18next}>
          <BrowserRouter>
            <React.Fragment>
              <HtmlHead htmlLang={i18nextState.language || config.i18n.lng} />
              <App />
            </React.Fragment>
          </BrowserRouter>
        </I18nProvider>
      </AsyncComponentProvider>
    </ApolloProvider>
  );

  renderApp(markup, document.getElementById('root'));

  if (process.env.NODE_ENV === 'production') {
    register('/sw.js');
  } else {
    unregisterAll();
  }
});

if (module.hot) {
  module.hot.accept();
}
