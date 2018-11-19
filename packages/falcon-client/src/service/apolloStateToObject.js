/**
 * This method expands flatten Apollo cache value into a nested object
 * @param {object} state Apollo state object
 * @param {string} key Apollo state key
 * @return {object} Expanded object
 */
const expandValue = (state, key) => {
  const value = Object.assign({}, state[key]);
  Object.keys(value).forEach(vKey => {
    const vValue = value[vKey];
    if (vValue && typeof vValue === 'object' && vValue.generated && vValue.id) {
      value[vKey] = expandValue(state, vValue.id);
    }
    if (vValue && vValue.type === 'json') {
      value[vKey] = vValue.json;
    }
  });
  return value;
};

export default expandValue;
