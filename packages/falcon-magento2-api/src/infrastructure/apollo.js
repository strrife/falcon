/**
 * Build string representation of Apollo TypeResolver path
 * @param {{ key: string, prev: { key: string, prev: prev}}} typeResolverPath apollo type resolver path
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
