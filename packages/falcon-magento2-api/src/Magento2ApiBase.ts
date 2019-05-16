import { ApiDataSource } from '@deity/falcon-server-env';
import {
  AuthScope,
  IntegrationAuthType,
  getDefaultAuthScope,
  isIntegrationAuthTypeSupported,
  inferIsAuthRequired,
  setAuthScope
} from './authorization';

const util = require('util');
const _ = require('lodash');
const OAuth = require('oauth');
const addMilliseconds = require('date-fns/add_milliseconds');
const Logger = require('@deity/falcon-logger');

const { AuthenticationError, codes } = require('@deity/falcon-errors');

/**
 * Base API features (configuration fetching, response parsing, token management etc.) required for communication
 * with Magento2. Extracted to separate class to keep final class clean (only resolvers-related logic should be there).
 */
export class Magento2ApiBase extends ApiDataSource {
  /**
   * Create Magento api wrapper instance
   * @param {object} params configuration params
   */
  constructor(params) {
    super(params);
    this.storePrefix = this.config.storePrefix || 'default';
    this.cookie = null;
    this.magentoConfig = {};
    this.storeList = [];
    this.storeConfigMap = {};
    this.itemUrlSuffix = this.config.itemUrlSuffix || '.html';
  }

  storePrefix: string;

  cookie: any;

  magentoConfig: any;

  storeList: any[];

  storeConfigMap: any;

  itemUrlSuffix: string;

  oAuth: any;

  reqToken: any;

  // /**
  //  * create authorized GET request
  //  * @param {'integration' | 'customer' } scope authrization scope
  //  * @param {string} path path
  //  * @param {object} params ss
  //  * @param {object} init ss
  //  * @returns {Promise} sd
  //  */
  async getAuth(path, params = undefined, init: any = {}) {
    return super.get(path, params, setAuthScope(init, !!this.session.customerToken));
  }

  async postAuth(path, body = undefined, init: any = {}) {
    return super.post(path, body, setAuthScope(init, !!this.session.customerToken));
  }

  async patchAuth(path, body = undefined, init: any = {}) {
    return super.patch(path, body, setAuthScope(init, !!this.session.customerToken));
  }

  async putAuth(path, body = undefined, init: any = {}) {
    return super.put(path, body, setAuthScope(init, !!this.session.customerToken));
  }

  async deleteAuth(path, params = undefined, init: any = {}) {
    return super.delete(path, params, setAuthScope(init, !!this.session.customerToken));
  }

  async getForIntegration(path, params = undefined, init: any = {}) {
    return super.get(path, params, setAuthScope(init, AuthScope.Integration));
  }

  async postForIntegration(path, body = undefined, init: any = {}) {
    return super.post(path, body, setAuthScope(init, AuthScope.Integration));
  }

  async patchForIntegration(path, body = undefined, init: any = {}) {
    return super.patch(path, body, setAuthScope(init, AuthScope.Integration));
  }

  async putForIntegration(path, body = undefined, init: any = {}) {
    return super.put(path, body, setAuthScope(init, AuthScope.Integration));
  }

  async deleteForIntegration(path, params = undefined, init: any = {}) {
    return super.delete(path, params, setAuthScope(init, AuthScope.Integration));
  }

  async getForCustomer(path, params = undefined, init: any = {}) {
    return super.get(path, params, setAuthScope(init, AuthScope.Customer));
  }

  async postForCustomer(path, body = undefined, init: any = {}) {
    return super.post(path, body, setAuthScope(init, AuthScope.Customer));
  }

  async patchForCustomer(path, body = undefined, init: any = {}) {
    return super.patch(path, body, setAuthScope(init, AuthScope.Customer));
  }

  async putForCustomer(path, body = undefined, init: any = {}) {
    return super.put(path, body, setAuthScope(init, AuthScope.Customer));
  }

  async deleteForCustomer(path, params = undefined, init: any = {}) {
    return super.delete(path, params, setAuthScope(init, AuthScope.Customer));
  }

  /**
   * Makes sure that context required for http calls exists
   * Gets basic store configuration from Magento
   * @return {object} Magento config
   */
  async fetchBackendConfig() {
    const getCachedValue = async url => {
      const value = await this.cache.get([this.name, this.session.storeCode || 'default', url].join(':'), {
        fetchData: async () => {
          const rawValue = await this.getAuth(url);

          return JSON.stringify(rawValue);
        },
        options: {
          ttl: 10 * 60 // 10 min
        }
      });
      return JSON.parse(value);
    };

    const [storeConfigs, storeViews, storeGroups, storeWebsites] = await Promise.all([
      getCachedValue('/store/storeConfigs'),
      getCachedValue('/store/storeViews'),
      getCachedValue('/store/storeGroups'),
      getCachedValue('/store/websites')
    ]);

    // Processing "active" items only
    const activeStoreViews = storeViews.filter(x => x.extension_attributes.is_active && x.website_id);
    const activeStoreWebsites = storeWebsites.filter(storeWebsite => storeWebsite.id);
    const activeStoreGroups = storeGroups.filter(storeGroup => storeGroup.id);

    const activeStoreConfigs = storeConfigs.map(storeConfig => ({
      ..._.pick(storeConfig, [
        'id',
        'code',
        'website_id',
        'base_currency_code',
        'default_display_currency_code',
        'timezone',
        'weight_unit'
      ]),
      locale: storeConfig.locale.replace('_', '-'),
      ..._.pick(_.find(activeStoreViews, { id: storeConfig.id }), ['store_group_id', 'name'])
    }));
    this.storeConfigMap = _.keyBy(activeStoreConfigs, 'code');
    this.magentoConfig.locales = _.uniq(activeStoreConfigs.map(x => x.locale));

    activeStoreWebsites.forEach(storeWebsite => {
      const groups = [];
      let defaultGroup = null;
      let defaultStore = null;

      activeStoreGroups.forEach(storeGroup => {
        if (storeGroup.website_id === storeWebsite.id) {
          storeGroup.stores = [];
          activeStoreConfigs.forEach(storeConfig => {
            if (storeConfig.store_group_id === storeGroup.id) {
              storeGroup.stores.push(storeConfig);

              if (storeConfig.id === storeGroup.default_store_id) {
                defaultStore = storeConfig;
              }
            }
          });

          groups.push(storeGroup);
          if (storeGroup.id === storeWebsite.default_group_id) {
            defaultGroup = storeGroup;
          }
        }
      });

      this.storeList.push({
        ...storeWebsite,
        groups,
        defaultGroup,
        defaultStore
      });
    });

    await this.ensureStoreCode();

    return this.magentoConfig;
  }

  async setShopStore(obj, { storeCode }) {
    const storeConfig = this.findStoreConfig(storeCode);
    if (storeConfig) {
      this.session.storeCode = storeCode;
      this.session.currency = storeConfig.default_display_currency_code;
      this.session.baseCurrency = storeConfig.base_currency_code;
      this.session.timezone = storeConfig.timezone;
      this.session.weightUnit = storeConfig.weight_unit;
      this.context.session.locale = storeConfig.locale;
    }

    return this.magentoConfig;
  }

  async setShopCurrency(obj, { currency }) {
    const currentStoreConfig = this.getActiveStoreConfig();
    _.forEach(this.storeConfigMap, storeConfig => {
      if (currentStoreConfig.store_group_id === storeConfig.store_group_id) {
        if (storeConfig.default_display_currency_code === currency) {
          this.setShopStore({}, { storeCode: storeConfig.code });
        }
      }
    });
    return this.magentoConfig;
  }

  getActiveStoreConfig() {
    return this.findStoreConfig(this.session.storeCode);
  }

  findStoreConfig(code) {
    return this.storeConfigMap[code];
  }

  initialize(config) {
    super.initialize(config);

    const { auth = {} } = this.config;
    if (!isIntegrationAuthTypeSupported(auth.type)) {
      throw new Error(`Unsupported auth.type: "${auth.type}"!`);
    }

    const { customerToken } = this.session;
    if (customerToken && !this.isCustomerTokenValid(customerToken)) {
      this.session = {};
      this.context.session.save();
    }
  }

  /**
   * Helper method to recursively change key naming from underscore (snake case) to camelCase
   * @param {object} data - argument to process
   * @return {object} converted object
   */
  convertKeys(data) {
    // handle simple types
    if (!_.isPlainObject(data) && !Array.isArray(data)) {
      return data;
    }

    if (_.isPlainObject(data) && !_.isEmpty(data)) {
      const keysToConvert = _.keys(data);
      keysToConvert.forEach(key => {
        data[_.camelCase(key)] = this.convertKeys(data[key]);

        // remove snake_case key
        if (_.camelCase(key) !== key) {
          delete data[key];
        }
      });
    }

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        data[index] = this.convertKeys(item);
      });
    }

    return data;
  }

  /**
   * Resolves url based on passed parameters
   * @param {RequestOptions} req - request params
   * @return {Promise<URL>} resolved url object
   */
  async resolveURL(req) {
    return super.resolveURL({ ...req, path: this.getPathWithPrefix(req.path) });
  }

  getPathWithPrefix(path) {
    const { storeCode = this.storePrefix } = this.session;
    return `/rest/${storeCode}/V1${path}`;
  }

  /**
   * Will send request
   * @param {RequestOptions} req - request params
   */
  async willSendRequest(req) {
    req.headers.set('Cookie', this.cookie);

    await super.willSendRequest(req);
  }

  /**
   * Sets authorization headers for the passed request
   * @param {RequestOptions} req - request input
   */
  async authorizeRequest(req) {
    const { auth: authScope } = req.context;

    if (authScope === AuthScope.Integration) {
      const { auth } = this.config;
      if (auth.type === IntegrationAuthType.adminToken) {
        const token = await this.getAdminToken();
        req.headers.set('Authorization', `Bearer ${token}`);

        return;
      }

      if (auth.type === IntegrationAuthType.integrationToken) {
        const url = await this.resolveURL(req);
        req.params.forEach((value, key) => url.searchParams.append(key, value));

        const oauth = await this.getOAuth();
        const authorizationHeader = oauth.authHeader(
          url.toString(),
          auth.accessToken,
          auth.accessTokenSecret,
          req.method
        );
        req.headers.set('Authorization', authorizationHeader);

        return;
      }
    }

    if (authScope === AuthScope.Customer) {
      const { customerToken } = this.session;

      if (!this.isCustomerTokenValid(customerToken)) {
        const sessionExpiredError = new AuthenticationError(`Customer token has expired.`);
        sessionExpiredError.statusCode = 401;
        sessionExpiredError.code = codes.CUSTOMER_TOKEN_EXPIRED;
        throw sessionExpiredError;
      }

      req.headers.set('Authorization', `Bearer ${customerToken.token}`);

      return;
    }

    throw new Error(`Attempted to authenticate the request using an unsupported scope: "${authScope}"!`);
  }

  /**
   * Determines if Customer is Logged In via checking if its token exists
   * @return {boolean} - true if token exists
   */
  isCustomerLoggedIn() {
    const { customerToken } = this.session;

    return customerToken && customerToken.token;
  }

  /**
   * Check if authentication token is valid
   * @param {AuthToken} authToken - authentication token
   * @return {boolean} - true if token is valid
   */
  isCustomerTokenValid(authToken) {
    if (!authToken || !authToken.token || !authToken.expirationTime) {
      return false;
    }

    return authToken.expirationTime > Date.now();
  }

  /**
   * Retrieves admin token
   * @return {{ value: string, options: { ttl: number } }} Result
   */
  async adminToken() {
    const { auth } = this.config;

    Logger.info(`${this.name}: Retrieving admin token.`);

    const dataNow = Date.now();
    const token = await this.post(
      '/integration/admin/token',
      {
        username: auth.username,
        password: auth.password
      },
      { context: { isAuthRequired: false } }
    );

    if (token === undefined) {
      const noTokenError = new Error(
        'Magento Admin token not found. Did you install the latest version of the falcon-magento2-module on magento?'
      );
      (noTokenError as any).statusCode = 501;
      (noTokenError as any).code = codes.CUSTOMER_TOKEN_NOT_FOUND;
      throw noTokenError;
    } else {
      Logger.info(`${this.name}: Admin token found.`);
    }

    // FIXME: bellow code does not make sense anymore !!!
    // according to https://github.com/deity-io/falcon-magento2-development/issues/32
    // admin_token_ttl is returned via `/store/storeConfigs`, so if we want to cache adminToken
    // we need to do it right after fetching `storeConfig`. Be aware that adminToken is required to fetch storeConfig :)
    const validTime = 1;
    const ttl = (validTime * 60 - 5) * 60;
    Logger.debug(`${this.name}: Admin token valid for ${validTime} hours, till ${addMilliseconds(dataNow, ttl)}`);

    return {
      value: token,
      options: { ttl }
    };
  }

  /**
   * Get Magento API authorized admin token or perform request to create it.
   * "reqToken" property is being used for parallel calls
   * @return {Promise<string>} token value
   */
  async getAdminToken() {
    if (!this.reqToken) {
      this.reqToken = this.cache.get([this.name, 'admin_token'].join(':'), {
        fetchData: async () => this.adminToken()
      });
    }
    return this.reqToken;
  }

  /**
   * Get Magento oAuth authorization configuration.
   * @return {Promise<OAuth>} token value
   */
  async getOAuth() {
    if (!this.oAuth) {
      this.oAuth = this.cache.get([this.name, 'oAuth'].join(':'), {
        fetchData: async () => {
          const { auth } = this.config;
          if (auth.type !== 'integration-token') {
            throw new Error(`API client is not configured for "integration-token" authentication method.`);
          }

          const oauth = new OAuth.OAuth(
            this.baseURL.concat('/oauth/token/request'),
            this.baseURL.concat('/oauth/token/access'),
            auth.consumerKey,
            auth.consumerSecret,
            '1',
            null,
            'HMAC-SHA1'
          );

          // TODO: make full handshake

          return oauth;
        }
      });
    }
    return this.oAuth;
  }

  /**
   * Process received response data
   * @param {Response} response - received response from the api
   * @param {Request} request - request
   * @return {object} processed response data
   */
  async didReceiveResponse(response, request) {
    const cookies = (response.headers.get('set-cookie') || '').split('; ');
    const data = await super.didReceiveResponse(response, request);
    const { pagination: paginationInput } = response.context;

    if (cookies.length) {
      // For "customer/token" API call - we don't get PHPSESSID cookie
      cookies.forEach(cookieString => {
        if (cookieString.match(/PHPSESSID=(\w+\d+)/)) {
          this.cookie = cookieString.match(/PHPSESSID=(\w+\d+)/)[0];
        }
      });
    }

    // no pagination data requested - skip computation of pagination
    if (!paginationInput) {
      return data;
    }

    const { page, perPage } = paginationInput;
    const { total_count: total } = data;

    // process search criteria
    const pagination = this.processPagination(total, page, perPage);
    return { items: data.items, filters: data.filters || [], pagination };
  }

  /**
   * Handle error occurred during http response
   * @param {Error} error Error to process
   * @param {object} req Request object
   */
  didEncounterError(error, req) {
    const { extensions = {} } = error;
    const { response } = extensions;

    // Re-formatting error message using provided response data from Magento
    if (response) {
      const { body = {} } = response;
      const { message, parameters } = body;

      if (Array.isArray(parameters)) {
        error.message = util.format(message.replace(/(%\d)/g, '%s'), ...parameters);
      } else if (typeof parameters === 'object') {
        error.message = util.format(message.replace(/(%\w+\b)/g, '%s'), ...Object.values(parameters));
      } else {
        error.message = message;
      }
    }

    super.didEncounterError(error, req);
  }

  /**
   * Ensuring that user gets storeCode in the session with the first hit.
   * @param {object} context Context object
   */
  async ensureStoreCode() {
    const { storeCode } = this.session;

    // Checking if current storeCode is valid
    if (this.getActiveStoreConfig()) {
      return;
    }

    // Fixing invalid storeCode
    Logger.debug(`${this.name}: ${storeCode ? 'is invalid' : 'store code is missing'}, removing cart data`);
    delete this.session.storeCode;
    delete this.session.cart;
    await this.setShopStore({}, { storeCode: 'default' });
  }
}
