import deepMerge from 'deepmerge';

/**
 * Request authorization scope
 */
export const AuthScope = {
  /** Authorize request using Integration credentials (integration-token or admin-token) */
  Integration: 'integration',

  /** Authorize request using Customer credentials (the customer's username and password) */
  Customer: 'customer'
};

/**
 * Integration request authorization type
 */
export const IntegrationAuthType = {
  /** Integration Token (oAuth) */
  integrationToken: 'integration-token',

  /** Admin Token (the admin's username and password) */
  adminToken: 'admin-token'
};

/**
 * Calculate default request authorization scope
 * @param {boolean} customerTokenExists Customer authorization token
 * @returns {'integration' | 'customer' } Authorization scope
 */
export function getDefaultAuthScope(customerTokenExists) {
  return customerTokenExists ? AuthScope.Customer : AuthScope.Integration;
}

/**
 * Check if authType is one of the supported IntegrationAuthType entries
 * @param {string} authType Integration authentication method type
 * @returns {boolean} true if it is supported
 */
export function isIntegrationAuthTypeSupported(authType) {
  return Object.keys(IntegrationAuthType).some(x => IntegrationAuthType[x] === authType);
}

/**
 * Infer if isAuthRequired should be true if not explicitly set
 * @param {{}} context request context
 * @returns {boolean} true if request authorization is required
 */
export function inferIsAuthRequired(context: { isAuthRequired: boolean; auth: string }) {
  return context.isAuthRequired === undefined ? !!context.auth : context.isAuthRequired;
}

/* eslint-disable import/export */
/** Sets default authorization info onto the request
 * @param {object} requestOptions request options
 * @param {boolean} isCustomerLoggedIn if true then `customer` scope otherwise `integration`
 */
export function setAuthScope(requestOptions: { context: any }, isCustomerLoggedIn: boolean);
/** Sets authorization info onto the request
 * @param {object} requestOptions request options
 * @param {string} scope desired authorization scope
 */
export function setAuthScope(requestOptions: { context: any }, scope: string);
export function setAuthScope(requestOptions: { context: any }, arg: string | boolean) {
  const authContext =
    typeof arg === 'string'
      ? { auth: arg, isAuthRequired: true }
      : { auth: arg ? AuthScope.Customer : AuthScope.Integration, isAuthRequired: true };

  return deepMerge(requestOptions, { context: authContext });
}
/* eslint-enable import/export */
