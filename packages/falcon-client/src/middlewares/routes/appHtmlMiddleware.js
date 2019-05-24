import React from 'react';
import { renderToString } from 'react-dom/server';
import { extractI18nextState } from '../../i18n/i18nServerFactory';
import Html from '../../components/Html';

/**
 * Application html renderer middleware.
 * @param {{webpackAssets: Object}} params webpack assets
 * @returns {function(ctx: object, next: function): Promise<void>} Koa middleware
 */
export default ({ webpackAssets, config }) => async ctx => {
  const { AppMarkup, client, chunkExtractor, helmetContext, serverTiming } = ctx.state;
  const renderTimer = serverTiming.start('HTML renderToString()');

  const { publicPath, assets } = webpackAssets;
  const webmanifest = assets.find(x => x.name.endsWith('webmanifest'));

  const htmlDocument = renderToString(
    <Html
      assets={{
        webmanifest: webmanifest ? `${publicPath}${webmanifest.name}` : undefined
      }}
      chunkExtractor={chunkExtractor}
      helmetContext={helmetContext}
      state={client.extract()}
      i18nextState={extractI18nextState(ctx)}
      googleTagManager={config.googleTagManager}
    >
      {AppMarkup}
    </Html>
  );

  serverTiming.stop(renderTimer);

  ctx.status = 200;
  ctx.body = `<!doctype html>${htmlDocument}`;
};
