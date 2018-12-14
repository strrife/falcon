import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { APP_INIT } from '../../graphql/config.gql';
import HtmlHead from '../../components/HtmlHead';

/**
 * App shell rendering middleware.
 * @return {function(ctx: object, next: function): Promise<void>} Koa middleware
 */
export default () => async (ctx, next) => {
  const { client } = ctx.state;
  const { config } = client.readQuery({ query: APP_INIT });
  const extractor = new ChunkExtractor({ statsFile: process.env.LOADABLE_STATS, entrypoints: ['client'] });

  const markup = (
    <ChunkExtractorManager extractor={extractor}>
      <HtmlHead htmlLang={config.i18n.lng} />
    </ChunkExtractorManager>
  );

  renderToString(markup);

  ctx.state.scriptElements = extractor.getScriptElements();
  ctx.state.styleElements = extractor.getStyleElements();

  ctx.state.helmetContext = Helmet.renderStatic();

  return next();
};
