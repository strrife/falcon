const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
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
    const defaultValue = {
      ttl
    };

    // Some APIDataSources may provide extra type-resolvers during the runtime via "addResolveFunctionsToSchema"
    // which will override "wrapped" resolve functions during Falcon-Server startup. By providing getter/setter
    // methods - we can ensure such such calls will be handled properly.
    Object.defineProperty(field, 'resolve', {
      get: () => this.getResolverWithCache(resolve, field, defaultValue),
      // Handling potential "addResolveFunctionsToSchema" calls that define dynamic resolvers
      set: newResolve => {
        resolve = newResolve;
      }
    });
  }

  getResolverWithCache(resolve, field, defaultValue) {
    const thisDirective = this;
    return async function fieldResolver(parent, params, context, info) {
      const {
        config: { cache: cacheConfig = {} }
      } = context;
      const { ttl } = thisDirective.getCacheConfigForField(info, cacheConfig, defaultValue);
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
        callback: async () => resolve.call(this, parent, params, context, info)
      });
    };
  }

  /**
   * Returns cache options object based on the provided data in this order/prio:
   * - default cache config
   * - default cache config provided from `context.config`
   * - cache config provided in `@cache(...)` directive
   * - cache config for a specific operation via `context.config`
   * @param {object} info GraphQL Request info object
   * @param {object} cacheConfig Cache object provided via `context.config`
   * @param {object} defaultDirectiveValue Default options defined in cache directive for the specific type
   * @return {object} Final cache options object
   */
  getCacheConfigForField(info, cacheConfig, defaultDirectiveValue) {
    const { path: gqlPath, operation } = info;
    const fullPath = `${operation.operation}.${this.getOperationPath(gqlPath)}`;
    const { [fullPath]: operationConfig = {}, default: defaultConfig = {} } = cacheConfig;

    return Object.assign({}, defaultConfig, defaultDirectiveValue, operationConfig);
  }

  /**
   * Generates a path-like string for the provided request
   * for `query { foo { bar } }` - it will generate "foo.bar" string
   * @param {object} node Operation path object
   * @return {string} Generated operation path string
   */
  getOperationPath(node) {
    const { key, prev } = node;
    const keys = [key];
    if (prev) {
      keys.unshift(this.getOperationPath(prev));
    }
    return keys.join('.');
  }
};
