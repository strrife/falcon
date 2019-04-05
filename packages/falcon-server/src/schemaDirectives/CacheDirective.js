const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver, GraphQLInt } = require('graphql');
const crypto = require('crypto');

// Default cache TTL (10 minutes)
const DEFAULT_TTL = 10;

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
    const { ttl = DEFAULT_TTL } = this.args;
    let { resolve = defaultFieldResolver } = field;

    field.args.push({
      name: 'cacheTtl',
      type: GraphQLInt,
      description: `Modifies the default cache TTL value for this data`,
      defaultValue: ttl
    });

    // Some APIDataSources may provide extra type-resolvers during the runtime via "addResolveFunctionsToSchema"
    // which will override "wrapped" resolve functions during Falcon-Server startup. By providing getter/setter
    // methods - we can ensure such such calls will be handled properly.
    Object.defineProperty(field, 'resolve', {
      get: () => this.getResolverWithCache(resolve, field),
      // Handling potential "addResolveFunctionsToSchema" calls that define dynamic resolvers
      set: newResolve => {
        resolve = newResolve;
      }
    });
  }

  getResolverWithCache(resolve, field) {
    return async function fieldResolver(...args) {
      const { cacheTtl, ...params } = args[1];
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
          ttl: cacheTtl * 60 // minutes to seconds
        },
        callback: async () => resolve.apply(this, args)
      });
    };
  }
};
