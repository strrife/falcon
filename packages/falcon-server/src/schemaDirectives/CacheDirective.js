const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
const crypto = require('crypto');

// Default cache TTL (10 minutes)
const DEFAULT_TTL = 10;
const TAG_SEPARATOR = ':';
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

  getResolverWithCache(resolve, field, defaultValue) {
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
      const { ttl } = thisDirective.getCacheConfigForField(info, resolversCacheConfig, defaultValue);

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
          return thisDirective.handleCacheCallbackResponse(field, result, parent, context, info);
        }
      });
    };
  }

  handleCacheCallbackResponse(field, result, parent, context, info) {
    const { idPath = [] } = this.args;
    const { name: returnTypeName } = this.getRealType(info.returnType);
    const tags = [returnTypeName];

    const entityIdFieldName = this.getCacheIdFieldName(info.returnType);
    // Checking if Type is "self-cacheable" - it contains ID field and its value
    if (entityIdFieldName) {
      tags.push(...this.getCacheTags(returnTypeName, this.getFieldValue(result, entityIdFieldName)));
    }

    idPath.forEach(idPathEntry => {
      tags.push(...this.getTagsForIdPath(idPathEntry, result, info, parent));
    });

    return result;
  }

  getTagsForIdPath(idPath, result, info, parent) {
    const [rootPath, ...pathParts] = idPath.split(PATH_SEPARATOR);
    const valueToCheck = rootPath === PARENT_KEYWORD ? parent : result;
    const typeToCheck = this.getRealType(rootPath === PARENT_KEYWORD ? info.parentType : info.returnType);
    if (rootPath !== PARENT_KEYWORD) {
      // Put first path section back to "pathParts" for non-parent entries
      pathParts.unshift(rootPath);
    }

    return this.getTagsForField(valueToCheck, typeToCheck, pathParts);
  }

  getTagsForField(value, typeField, idPath = []) {
    if (!idPath.length) {
      const fieldName = this.getCacheIdFieldName(typeField);
      if (fieldName) {
        return this.getCacheTags(typeField, this.getFieldValue(value, fieldName));
      }
    }

    const [currentPath, ...restIdPath] = idPath;
    const { _fields: fields } = typeField;
    let { name: typeName } = typeField;
    let fieldValue = this.getFieldValue(value, currentPath);

    // Keep looking for nested ID path
    if (currentPath && restIdPath.length) {
      return this.getTagsForField(fieldValue, this.getRealType(fields[currentPath].type), restIdPath);
    }
    if (Array.isArray(fieldValue)) {
      const currentType = this.getRealType(fields[currentPath].type);
      typeName = currentType.name;
      const currentCacheIdFieldName = this.getCacheIdFieldName(currentType);
      fieldValue = this.getFieldValue(fieldValue, currentCacheIdFieldName);
    }

    return [typeName, ...this.getCacheTags(typeName, fieldValue)];
  }

  /**
   * Get a field name with a `ID` type
   * @param {object} objectType GQL Object Type
   * @return {string|undefined} Name of the field
   */
  getCacheIdFieldName(objectType) {
    const { _fields: fields } = this.getRealType(objectType);

    return Object.keys(fields).find(fieldName => {
      const { [fieldName]: fieldType } = fields;
      const { name } = this.getRealType(fieldType.type);
      return name === 'ID';
    });
  }

  getFieldValue(valueToCheck, fieldName) {
    if (Array.isArray(valueToCheck)) {
      return valueToCheck.map(item => this.getFieldValue(item, fieldName));
    }

    return fieldName in valueToCheck ? valueToCheck[fieldName] : undefined;
  }

  /**
   * Concatenates type with ID to generate a tag
   * @param {string} entityName Entity Type name
   * @param {string|string[]} entityId Entity ID or list of IDs
   * @return {string[]} Concatenated cache-tag array of strings
   */
  getCacheTags(entityName, entityId) {
    if (!entityId) {
      return [];
    }
    const ids = Array.isArray(entityId) ? entityId : [entityId];
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
    return keys.join(PATH_SEPARATOR);
  }

  /**
   * @private
   * @param {object} type GQL Object type
   * @return {object} "real" object type
   */
  getRealType(type) {
    const realType = type.ofType || type;
    return realType.ofType ? this.getRealType(realType) : type;
  }
};
