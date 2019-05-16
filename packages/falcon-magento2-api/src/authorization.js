const deepMerge = require('deepmerge');

/**
 * Request authorization scope
 */
const AuthScope = {
  /** Authorize request using Integration credentials (integration-token or admin-token) */
  Integration: 'integration',

  /** Authorize request using Customer credentials (the customer's username and password) */
  Customer: 'customer'
};

/**
 * Integration request authorization type
 */
const IntegrationAuthType = {
  /** Integration Token (oAuth) */
  integrationToken: 'integration-token',

  /** Admin Token (the admin's username and password) */
  adminToken: 'admin-token'
};

/**
 * Check if authType is one of the supported IntegrationAuthType entries
 * @param {string} authType Integration authentication method type
 * @returns {boolean} true if it is supported
 */
function isIntegrationAuthTypeSupported(authType) {
  return Object.keys(IntegrationAuthType).some(x => IntegrationAuthType[x] === authType);
}

/** Sets authorization info onto the request
 * @param {{ context: any }} requestOptions request options
 * @param {string|boolean} param desired authorization scope or if true then `customer` scope otherwise `integration`
 * @returns {string} authorization scope
 */
function setAuthScope(requestOptions, param) {
  const authContext =
    typeof param === 'string'
      ? { isAuthRequired: true, auth: param }
      : { isAuthRequired: true, auth: param ? AuthScope.Customer : AuthScope.Integration };

  return deepMerge(requestOptions, { context: authContext });
}

module.exports = {
  AuthScope,
  IntegrationAuthType,
  isIntegrationAuthTypeSupported,
  setAuthScope
};
