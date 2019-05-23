const Logger = require('@deity/falcon-logger');
const { generateTagNames } = require('../graphqlUtils');

/**
 * @typedef {import('@deity/falcon-server-env').Cache} Cache
 * @typedef {import('koa').Middleware} Middleware
 *
 * @typedef {object} CacheTagEntry
 * @property {string} type Entity Type
 * @property {string} id Entity ID
 */

/**
 * Cache middleware for handling web-hooks to flush the cache by tags
 * @example curl -X POST http://localhost:4000/cache -H 'Content-Type: application/json' -d '[{"id": 1, "type": "Product"}]'
 * @param {Cache} cache Cache component
 * @return {Middleware} Koa middleware callback
 */
const cacheInvalidatorMiddleware = cache => async ctx => {
  /** @type {Array<CacheTagEntry>} List of posted cache tag entries to invalidate */
  const requestTags = ctx.request.body;
  if (ctx.request.get('content-type') !== 'application/json') {
    throw new Error('Invalid Content-Type, must be "application/json"');
  }
  if (!Array.isArray(requestTags)) {
    throw new Error('Invalid POST data');
  }

  /** @type {Array<string>} List of cache tags */
  const tags = requestTags
    .map(({ id, type }) => (id && type ? generateTagNames(type, id) : type))
    .filter(value => value);

  Logger.debug(`Flushing cache tags: ${tags.join(', ')}`);
  await cache.delete(tags);
  ctx.body = 'ok';
};

module.exports = cacheInvalidatorMiddleware;
