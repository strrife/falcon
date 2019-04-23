const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
const crypto = require('crypto');

// Default cache TTL (10 minutes)
const DEFAULT_TTL = 10;
const TAG_SEPARATOR = ':';
const TAG_ID_FIELD_TYPE = 'ID';
const PATH_SEPARATOR = '.';
const PARENT_KEYWORD = '$parent';

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

  /**
   * Get a resolver function with caching capabilities (depends on the provided config)
   * @param {Function} resolve Native GQL resolver function
   * @param {object} field Field info object
   * @param {object} defaultCacheConfig Default cache config
   * @return {Function} Resolver function with caching
   */
  getResolverWithCache(resolve, field, defaultCacheConfig) {
    const thisDirective = this;
    return async function fieldResolver(parent, params, context, info) {
      const resolver = async () => resolve.call(this, parent, params, context, info);
      const {
        config: { cache: { resolvers: resolversCacheConfig = {} } = {} }
      } = context;

      if (resolversCacheConfig.enabled !== true) {
        // Schema caching is disabled globally
        return resolver();
      }
      const { ttl } = thisDirective.getCacheConfigForField(info, resolversCacheConfig, defaultCacheConfig);

      if (!ttl) {
        // TTL is falsy - skip cache checks
        return resolver();
      }

      const cacheContext = {};
      Object.keys(context.dataSources).forEach(dsName => {
        const ds = context.dataSources[dsName];
        if (ds.getCacheContext) {
          cacheContext[dsName] = ds.getCacheContext();
        }
      });

      const { name: fieldName } = field;
      // Generating short and unique cache-key
      const cacheKey = crypto
        .createHash('sha1')
        .update([fieldName, JSON.stringify([parent, params, cacheContext])].join(':'))
        .digest('base64');

      return context.cache.get({
        key: cacheKey,
        options: {
          ttl: ttl * 60 // minutes to seconds
        },
        callback: async () => {
          const result = await resolver();
          return thisDirective.handleCacheCallbackResponse(result, parent, info);
        }
      });
    };
  }

  /**
   * Execute the actual GraphQL resolver and generate cache tags
   * @param {object} result Resolver result
   * @param {object} parent GraphQL parent object
   * @param {object} info GraphQL Info object
   * @return {object} Final resolver result
   */
  handleCacheCallbackResponse(result, parent, info) {
    const { idPath = [] } = this.args;
    const { name: returnTypeName } = this.getRootType(info.returnType);
    const tags = [returnTypeName];

    // Checking if Type is "self-cacheable"
    tags.push(...this.getTagsForField(result, info.returnType));

    idPath.forEach(idPathEntry => {
      tags.push(...this.extractTagsForIdPath(idPathEntry, result, info, parent));
    });

    return result;
  }

  /**
   * Extract cache tags for the provided ID path and return a list of tags
   * @param {string} idPath ID operation path string (like "$parent.items" or "items")
   * @param {object} result Resolver result
   * @param {object} info GraphQL info object
   * @param {object} parent GraphQL parent object
   * @return {string[]} List of tags
   */
  extractTagsForIdPath(idPath, result, info, parent) {
    const [rootPath, ...pathParts] = idPath.split(PATH_SEPARATOR);
    const valueToCheck = rootPath === PARENT_KEYWORD ? parent : result;
    const typeToCheck = this.getRootType(rootPath === PARENT_KEYWORD ? info.parentType : info.returnType);
    if (rootPath !== PARENT_KEYWORD) {
      // Put first path section back to "pathParts" for non-parent entries
      pathParts.unshift(rootPath);
    }

    return this.getTagsForField(valueToCheck, typeToCheck, pathParts);
  }

  /**
   * Get a list of tags from the provided value for the specified typeField
   * @param {object} value Value to checks
   * @param {object} typeField GraphQL Type Object
   * @param {string[]} [pathParts=[]] Path parts
   * @return {string[]} List of tags
   */
  getTagsForField(value, typeField, pathParts = []) {
    if (!pathParts.length) {
      return this.generateCacheTags(typeField, this.extractFieldValue(value, this.findTagIdFieldName(typeField)));
    }

    const [currentPath, ...restIdPath] = pathParts;
    const { _fields: fields } = typeField;
    let { name: typeName } = typeField;
    let fieldValue = this.extractFieldValue(value, currentPath);

    // Keep looking for nested ID path until it reaches the end node
    if (currentPath && restIdPath.length) {
      return this.getTagsForField(fieldValue, this.getRootType(fields[currentPath].type), restIdPath);
    }
    if (Array.isArray(fieldValue)) {
      const currentType = this.getRootType(fields[currentPath].type);
      typeName = currentType.name;
      const currentCacheIdFieldName = this.findTagIdFieldName(currentType);
      fieldValue = this.extractFieldValue(fieldValue, currentCacheIdFieldName);
    }

    return [typeName, ...this.generateCacheTags(typeName, fieldValue)];
  }

  /**
   * Find a field name with TAG_ID_FIELD_TYPE type
   * @param {object} objectType GQL Object Type
   * @return {string|undefined} Name of the field with
   */
  findTagIdFieldName(objectType) {
    const { _fields: fields } = this.getRootType(objectType);

    return Object.keys(fields).find(fieldName => {
      const { [fieldName]: fieldType } = fields;
      const { name } = this.getRootType(fieldType.type);
      return name === TAG_ID_FIELD_TYPE;
    });
  }

  /**
   * Extract a value by fieldName from the provided "value" argument
   * @param {object|object[]} value Value to check
   * @param {string} fieldName Name of the field
   * @return {undefined|string|string[]} Value or list of values (in case of "value" argument is an array)
   */
  extractFieldValue(value, fieldName) {
    if (Array.isArray(value)) {
      return value.map(item => this.extractFieldValue(item, fieldName));
    }

    return fieldName in value ? value[fieldName] : undefined;
  }

  /**
   * Generate cache tag(s) by concatenating entityName with entityId(s)
   * @param {string} entityName Entity Type name
   * @param {string|string[]} entityId Entity ID or list of IDs
   * @return {string[]} Concatenated cache-tag array of strings
   */
  generateCacheTags(entityName, entityId) {
    if (!entityId) {
      return [];
    }
    const ids = Array.isArray(entityId) ? entityId.filter(element => element) : [entityId];
    return ids.map(id => `${entityName}${TAG_SEPARATOR}${id}`);
  }

  /**
   * Returns cache options object based on the provided data in this order/prio:
   * - default cache config
   * - default cache config provided from `context.config`
   * - cache config provided in `@cache(...)` directive
   * - cache config for a specific operation via `context.config`
   * @param {object} info GraphQL Request info object
   * @param {object} resolversCacheConfig Cache object provided via `context.config`
   * @param {object} defaultDirectiveValue Default options defined in cache directive for the specific type
   * @return {object} Final cache options object
   */
  getCacheConfigForField(info, resolversCacheConfig, defaultDirectiveValue) {
    const { path: gqlPath, operation } = info;
    const fullPath = `${operation.operation}.${this.getOperationPath(gqlPath)}`;
    const { [fullPath]: operationConfig = {}, default: defaultConfig = {} } = resolversCacheConfig;

    return Object.assign({}, defaultConfig, defaultDirectiveValue, operationConfig);
  }

  /**
   * Generates a path-like string for the provided request
   * for `query { foo { bar } }` - it will generate `foo.bar` string
   * @param {object} node Operation path object
   * @return {string} Generated operation path string
   */
  getOperationPath(node) {
    const { key, prev } = node;
    const keys = [key];
    if (prev) {
      keys.unshift(this.getOperationPath(prev));
    }
    return keys.join(PATH_SEPARATOR);
  }

  /**
   * Extract "root" type from GQL field by getting "ofType" sub-type until it reaches the root field
   * @private
   * @param {object} type GQL Object type
   * @return {object} "root" object type
   */
  getRootType(type) {
    const realType = type.ofType || type;
    return realType.ofType ? this.getRootType(realType) : realType;
  }
};
