const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
const crypto = require('crypto');

/**
 * `@cache` directive
 * Caches the result of your resolver
 * ```
 * type Query {
 *   data: DataResult @cache
 *   foo: Bar @cache(ttl: 20)
 * }
 * ```
 */
module.exports = class CacheDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { ttl = 10 } = this.args;
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function fieldResolver(...args) {
      const params = args[1];
      const context = args[2];
      const { name: fieldName } = field;
      // Generating short and unique cache-key
      const cacheKey = crypto
        .createHash('sha1')
        .update(`${fieldName}-${JSON.stringify(params)}`)
        .digest('base64');

      return context.cache.get({
        key: cacheKey,
        options: {
          ttl: ttl * 60 // minutes to seconds
        },
        callback: async () => resolve.apply(this, args)
      });
    };
  }
};
