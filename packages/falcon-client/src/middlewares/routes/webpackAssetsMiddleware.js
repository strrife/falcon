import { ChunkExtractor } from '@loadable/server';

/**
 * Assets middleware
 * @param {{webpackAssets: object}} params webpack assets
 * @return {function(ctx: object, next: function): Promise<void>} Koa middleware
 */
export default ({ webpackAssets }) => {
  const chunkExtractor = new ChunkExtractor({
    stats: webpackAssets,
    entrypoints: ['client'],
    outputPath: process.env.OUTPUT_DIR
  });

  return async (ctx, next) => {
    ctx.state.webpackAssets = webpackAssets;
    ctx.state.chunkExtractor = chunkExtractor;

    return next();
  };
};
