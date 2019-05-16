/**
 * Try to parse provided value to Number (using Number.parseFloat())
 * @param {object} x value to parse
 * @return {Number|undefined} `Number` if can or `undefined` otherwise
 */
function tryParseNumber(x) {
  const parsed = Number.parseFloat(x);

  return Number.isNaN(parsed) ? undefined : parsed;
}

module.exports = {
  tryParseNumber
};
