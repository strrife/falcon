const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver, GraphQLInt } = require('graphql');
const crypto = require('crypto');

// Default cache TTL (10 minutes)
const DEFAULT_TTL = 10;
const INPUT_TTL = 'cacheTtl';

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

    // Injecting a scalar input type instead of "InputObjectType"
    // because the latter doesn't allow to set proper default values
    // so a developer would be able to override just a single parameter
    field.args.push({
      name: INPUT_TTL,
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
    return async function fieldResolver(parent, params, context, info) {
      const { [INPUT_TTL]: ttl } = params;
      const { name: fieldName } = field;
      // Generating short and unique cache-key
      const cacheKey = crypto
        .createHash('sha1')
        .update([fieldName, JSON.stringify(parent), JSON.stringify(params)].join(':'))
        .digest('base64');

      return context.cache.get({
        key: cacheKey,
        options: {
          ttl: ttl * 60 // minutes to seconds
        },
        callback: async () => resolve.apply(this, [parent, params, context, info])
      });
    };
  }
};
