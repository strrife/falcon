import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import HtmlHead from '../../components/HtmlHead';

/**
 * Server Side Rendering middleware.
 * @param {{App: React.Component}} App - React Component to render
 * @return {function(ctx: object, next: function): Promise<void>} Koa middleware
 */

export default ({ App, loadableStats }) => async (ctx, next) => {
  const { client, serverTiming } = ctx.state;
  const { i18next } = ctx;
  const context = {};

  const extractor = new ChunkExtractor({ stats: loadableStats, entrypoints: ['client'] });
  const i18nextUsedNamespaces = new Set();

  const markup = (
    <ApolloProvider client={client}>
      <ChunkExtractorManager extractor={extractor}>
        <I18nextProvider
          i18n={i18next}
          reportNS={ns => {
            i18nextUsedNamespaces.add(ns || i18next.options.defaultNS);
          }}
        >
          <StaticRouter context={context} location={ctx.url}>
            <React.Fragment>
              <HtmlHead htmlLang={i18next.language} />
              <App />
            </React.Fragment>
          </StaticRouter>
        </I18nextProvider>
      </ChunkExtractorManager>
    </ApolloProvider>
  );

  await serverTiming.profile(async () => getDataFromTree(markup), 'getDataFromTree()');

  ctx.state.AppMarkup = markup;
  // loadable components provides prefetch links, style and script tags and waits on the client for all script tags before rendering
  // https://www.smooth-code.com/open-source/loadable-components/docs/server-side-rendering/
  ctx.state.prefetchLinkElements = extractor.getLinkElements();
  ctx.state.scriptElements = extractor.getScriptElements();
  ctx.state.styleElements = extractor.getStyleElements();

  ctx.state.helmetContext = Helmet.renderStatic();

  // filterResourceStoreByNs(i18next.services.resourceStore.data, i18nextUsedNamespaces);
  ctx.state.i18nextFilteredStore = i18next.services.resourceStore.data;

  return context.url ? ctx.redirect(context.url) : next();
};
