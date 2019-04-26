/**
 * Request authorization method
 */
const AuthMethod = {
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
 * Calculate default request authorization method
 * @param {boolean} customerTokenExists Customer authorization token
 * @returns {'integration' | 'customer' } Authorization method
 */
function getDefaultAuthMethod(customerTokenExists) {
  if (customerTokenExists) {
    return AuthMethod.Customer;
  }

  return AuthMethod.Integration;
}

/**
 * Check if authType is one of supported IntegrationAuthType
 * @param {string} authType Integration authentication method type
 * @returns {boolean} true if it is supported
 */
function isIntegrationAuthTypeSupported(authType) {
  return Object.keys(IntegrationAuthType).some(x => IntegrationAuthType[x] === authType);
}

module.exports = {
  AuthMethod,
  IntegrationAuthType,
  getDefaultAuthMethod,
  isIntegrationAuthTypeSupported
};
