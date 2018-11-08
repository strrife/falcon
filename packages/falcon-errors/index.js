const codes = require('./src/codes');
const errors = require('./src/errors');

const codesAndErrors = { codes };
// eslint-disable-next-line
for (const key in errors) {
  codesAndErrors[key] = errors[key];
}

module.exports = codesAndErrors;
