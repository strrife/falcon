const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver, GraphQLInt, GraphQLInputObjectType } = require('graphql');
const crypto = require('crypto');

// Default cache TTL (10 minutes)
const DEFAULT_TTL = 10;
const INPUT_TTL = 'cacheTtl';
const INPUT_NAME = 'cacheOptions';
const INPUT_OBJECT_TYPE_NAME = 'CacheOptionsInput';

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
  constructor(config) {
    super(config);
    // Injecting "CacheOptionsInput" type definition into the GraphQL Schema
    if (!(INPUT_OBJECT_TYPE_NAME in this.schema._typeMap)) { // eslint-disable-line
      this.schema._typeMap[INPUT_OBJECT_TYPE_NAME] = this.getCacheOptionsInput(); // eslint-disable-line
    }
  }

  /**
   * Generates "INPUT_OBJECT_TYPE_NAME" input object type for overriding cache options
   * @param {number} [defaultTtl=DEFAULT_TTL] Default TTL value
   * @return {GraphQLInputObjectType} GraphQL Input Object Type instance
   */
  getCacheOptionsInput(defaultTtl = DEFAULT_TTL) {
    return new GraphQLInputObjectType({
      name: INPUT_OBJECT_TYPE_NAME,
      fields: {
        ttl: {
          name: INPUT_TTL,
          type: GraphQLInt,
          description: 'Modifies the default cache TTL value for this data',
          defaultValue: defaultTtl
        }
      }
    });
  }

  visitFieldDefinition(field) {
    const { ttl = DEFAULT_TTL } = this.args;
    let { resolve = defaultFieldResolver } = field;
    const defaultValue = {
      ttl
    };

    // Injecting cache options argument to the type resolver (into the GQL Schema)
    field.args.push({
      name: INPUT_NAME,
      type: this.getCacheOptionsInput(ttl),
      defaultValue
    });

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
    return async function fieldResolver(parent, params, context, info) {
      const { [INPUT_NAME]: cacheOptions = {} } = params;
      const { ttl } = Object.assign({}, defaultValue, cacheOptions);
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
