import React from 'react';
import { renderToString } from 'react-dom/server';
import { extractI18nextState } from '../../i18n/i18nServerFactory';
import Html from '../../components/Html';

/**
 * Application html renderer middleware.
 * @return {function(ctx: object, next: function): Promise<void>} Koa middleware
 */
export default ({ config }) => async ctx => {
  const { AppMarkup, client, assets, chunkExtractor, helmetContext, serverTiming } = ctx.state;
  const { webmanifest } = assets;

  const renderTimer = serverTiming.start('HTML renderToString()');

  const htmlDocument = renderToString(
    <Html
      assets={{
        webmanifest
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
