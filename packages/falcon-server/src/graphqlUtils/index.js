const { isScalarType } = require('graphql');

/**
 * @typedef {import('graphql').GraphQLType} GraphQLType
 * @typedef {import('graphql').ResponsePath} ResponsePath
 */

const PATH_SEPARATOR = '.';
const ID_FIELD_TYPE = 'ID';

/**
 * Generates a path-like string for the provided request
 * for `query { foo { bar } }` - it will generate `foo.bar` string
 * @param {ResponsePath} node Operation path object
 * @return {string} Generated operation path string
 */
const getOperationPath = node => {
  const { key, prev } = node;
  const keys = [key];
  if (prev) {
    keys.unshift(getOperationPath(prev));
  }
  return keys.join(PATH_SEPARATOR);
};

/**
 * Extract "root" type from GQL field by getting "ofType" sub-type until it reaches the root field
 * @param {GraphQLType} type GQL Object type
 * @return {GraphQLType} "root" object type
 */
const getRootType = type => {
  const realType = type.ofType || type;
  return realType.ofType ? getRootType(realType) : realType;
};

/**
 * Extract a value by `fieldName` from the provided `sourceValue`
 * @param {object|object[]} sourceValue Source object to get a field value from
 * @param {string} fieldName Name of the field
 * @return {undefined|string|string[]} Value or list of values (in case of `sourceValue` is an array)
 */
const getFieldValue = (sourceValue, fieldName) => {
  if (typeof sourceValue === 'undefined' || typeof fieldName === 'undefined') {
    return undefined;
  }
  if (Array.isArray(sourceValue)) {
    return sourceValue.map(item => getFieldValue(item, fieldName));
  }

  return fieldName in sourceValue ? sourceValue[fieldName] : undefined;
};

/**
 * Find a field name with ID_FIELD_TYPE type
 * @param {GraphQLType} gqlType GQL Object Type
 * @return {string|undefined} Name of the field with
 */
const findIdFieldName = gqlType => {
  const { _fields: fields, name: objectTypeName } = getRootType(gqlType);
  if (isScalarType(gqlType)) {
    throw new Error(`Caching for "${objectTypeName}" scalar type is not supported yet`);
  }

  return Object.keys(fields).find(fieldName => {
    const { [fieldName]: fieldType } = fields;
    const { name } = getRootType(fieldType.type);
    return name === ID_FIELD_TYPE;
  });
};

module.exports = {
  PATH_SEPARATOR,
  ID_FIELD_TYPE,
  getRootType,
  getOperationPath,
  getFieldValue,
  findIdFieldName
};
