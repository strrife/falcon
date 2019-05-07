/**
 * Try to parse provided value to Number.
 * @param {object} x value to parse
 * @return {Number|undefined} `Number` if can or `undefined` otherwise
 */
export function tryParseNumber(x) {
  const parsed = Number.parseFloat(x);

  return Number.isNaN(parsed) ? undefined : parsed;
}
