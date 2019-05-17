/**
 * Path segment definition (graphql ResponsePath)
 * @typedef {object} ResponsePath
 * @property {string} key path segment
 * @property {ResponsePath} prev previous path segment definition
 */

/**
 * Build string representation of Apollo TypeResolver info path
 * @param {ResponsePath} typeResolverPath apollo type resolver path
 * @returns {string} path
 */
function typeResolverPathToString(typeResolverPath) {
  const { key, prev } = typeResolverPath;

  if (typeof key === 'number') {
    return prev ? `${typeResolverPathToString(prev)}[${key}]` : `[${key}]`;
  }
  if (typeof key === `string`) {
    return prev ? `${typeResolverPathToString(prev)}.${key}` : `${key}`;
  }
  throw new Error(`support for key of type '${typeof key} is not implemented yet!'`);
}

module.exports = {
  typeResolverPathToString
};
