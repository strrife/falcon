import 'app-webmanifest';
import React from 'react';
import { hydrate, render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ApolloProvider } from 'react-apollo';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper2';
import { I18nextProvider } from 'react-i18next';
import { ApolloClient } from './service/ApolloClient';
import HtmlHead from './components/HtmlHead';
import App, { clientApolloSchema } from './clientApp';
import { CLIENT_SIDE_APP_INIT } from './graphql/config.gql';
import i18nFactory from './i18n/i18nClientFactory';
import { register, unregisterAll } from './serviceWorker';

// eslint-disable-next-line no-underscore-dangle
const apolloInitialState = window.__APOLLO_STATE__ || {};
const asyncComponentState = window.ASYNC_COMPONENTS_STATE;
const i18nextState = window.I18NEXT_STATE || {};

const apolloClient = new ApolloClient({
  isBrowser: true,
  clientState: clientApolloSchema,
  // eslint-disable-next-line no-underscore-dangle
  initialState: apolloInitialState
});
const { config } = apolloClient.readQuery({ query: CLIENT_SIDE_APP_INIT });
const renderApp = config.serverSideRendering ? hydrate : render;

const markup = (
  <ApolloProvider client={apolloClient}>
    <AsyncComponentProvider rehydrateState={asyncComponentState}>
      <I18nextProvider
        i18n={i18nFactory(config.i18n)}
        initialLanguage={i18nextState.language}
        initialI18nStore={i18nextState.data}
      >
        <BrowserRouter>
          <React.Fragment>
            <HtmlHead htmlLang={i18nextState.language || config.i18n.lng} />
            <App />
          </React.Fragment>
        </BrowserRouter>
      </I18nextProvider>
    </AsyncComponentProvider>
  </ApolloProvider>
);

asyncBootstrapper(markup).then(() => renderApp(markup, document.getElementById('root')));

if (process.env.NODE_ENV === 'production') {
  register('/sw.js');
} else {
  unregisterAll();
}

if (module.hot) {
  module.hot.accept();
}
