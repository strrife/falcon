const util = require('util');
const _ = require('lodash');
const OAuth = require('oauth');
const addMilliseconds = require('date-fns/add_milliseconds');
const Logger = require('@deity/falcon-logger');
const { ApiDataSource } = require('@deity/falcon-server-env');
const { AuthenticationError, codes } = require('@deity/falcon-errors');
const {
  AuthMethod,
  IntegrationAuthType,
  getDefaultAuthMethod,
  isIntegrationAuthTypeSupported
} = require('./authorization');

/**
 * Base API features (configuration fetching, response parsing, token management etc.) required for communication
 * with Magento2. Extracted to separate class to keep final class clean (only resolvers-related logic should be there).
 */
module.exports = class Magento2ApiBase extends ApiDataSource {
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
   * Will send request
   * @param {RequestOptions} req - request params
   */
  async willSendRequest(req) {
    const { context } = req;

    // apply default request authorization convention
    context.auth = context.auth === undefined ? getDefaultAuthMethod(!!this.session.customerToken) : context.auth;
    // if isAuthRequired is not explicitly set, we infer it from context.auth
    context.isAuthRequired = context.isAuthRequired === undefined ? !!context.auth : context.isAuthRequired;

    req.headers.set('Content-Type', 'application/json');
    req.headers.set('Cookie', this.cookie);

    await super.willSendRequest(req);
  }

  /**
   * Process received response data
   * @param {Response} response - received response from the api
   * @return {object} processed response data
   */
  async didReceiveResponse(response) {
    const cookies = (response.headers.get('set-cookie') || '').split('; ');
    const responseTags = response.headers.get('x-cache-tags');
    const data = await super.didReceiveResponse(response);
    const { pagination: paginationInput } = response.context;

    const meta = {};

    if (responseTags) {
      meta.tags = responseTags.split(',');
    }

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
      return { data, meta };
    }

    const { page, perPage } = paginationInput;
    const { total_count: total } = data;

    // process search criteria
    const pagination = this.processPagination(total, page, perPage);
    return { data: { items: data.items, filters: data.filters || [], pagination }, meta };
  }

  /**
   * Handle error occurred during http response
   * @param {Error} error Error to process
   * @param {object} req Request object
   */
  didEncounterError(error, req) {
    const { extensions } = error;
    const { response } = extensions || {};

    // Re-formatting error message using provided response data from Magento
    if (response) {
      const { body } = response;
      const { message, parameters } = body || {};

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
   * Makes sure that context required for http calls exists
   * Gets basic store configuration from Magento
   * @return {object} Magento config
   */
  async fetchBackendConfig() {
    const getCachedValue = async url => {
      const value = await this.cache.get({
        key: [this.name, this.session.storeCode || 'default', url].join(':'),
        callback: async () => {
          const rawValue = await this.get(url, {}, { context: { auth: AuthMethod.Integration } });
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
    const activeStoreViews = storeViews.data.filter(x => x.extension_attributes.is_active && x.website_id);
    const activeStoreWebsites = storeWebsites.data.filter(storeWebsite => storeWebsite.id);
    const activeStoreGroups = storeGroups.data.filter(storeGroup => storeGroup.id);

    const activeStoreConfigs = storeConfigs.data.map(storeConfig => ({
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
   * @param {object} req - request params
   * @return {Promise<URL>} resolved url object
   */
  async resolveURL(req) {
    const { path } = req;
    return super.resolveURL({ path: this.getPathWithPrefix(path) });
  }

  getPathWithPrefix(path) {
    const { storeCode = this.storePrefix } = this.session;
    return `/rest/${storeCode}/V1${path}`;
  }

  /**
   * Get Magento API authorized admin token or perform request to create it.
   * "reqToken" property is being used for parallel calls
   * @return {Promise<string>} token value
   */
  async getAdminToken() {
    if (!this.reqToken) {
      this.reqToken = this.cache.get({
        key: [this.name, 'admin_token'].join(':'),
        callback: async () => this.adminToken()
      });
    }
    return this.reqToken;
  }

  /**
   * Retrieves admin token
   * @return {{ value: string, options: { ttl: number } }} Result
   */
  async adminToken() {
    const { auth } = this.config || {};
    if (auth.type !== 'admin-token') {
      throw new Error(`API client is not configured for "admin-token" authentication method.`);
    }

    Logger.info(`${this.name}: Retrieving admin token.`);

    const dataNow = Date.now();
    const { data: token } = await this.post(
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
      noTokenError.statusCode = 501;
      noTokenError.code = codes.CUSTOMER_TOKEN_NOT_FOUND;
      throw noTokenError;
    } else {
      Logger.info(`${this.name}: Admin token found.`);
    }

    this.tokenExpirationTime = null;

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
   * @return {Promise<OAuth>} token value
   */
  async getOAuth() {
    if (!this.oAuth) {
      this.oAuth = this.cache.get({
        key: [this.name, 'oAuth'].join(':'),
        callback: async () => {
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
   * Sets authorization headers for the passed request
   * @param {RequestOptions} req - request input
   */
  async authorizeRequest(req) {
    const { auth: authMethod } = req.context;

    if (authMethod === AuthMethod.Integration) {
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

    if (authMethod === AuthMethod.Customer) {
      const { customerToken } = this.session || {};

      if (this.isCustomerTokenValid(customerToken)) {
        req.headers.set('Authorization', `Bearer ${customerToken.token}`);
      } else {
        const sessionExpiredError = new AuthenticationError(`Customer token has expired.`);
        sessionExpiredError.statusCode = 401;
        sessionExpiredError.code = codes.CUSTOMER_TOKEN_EXPIRED;
        throw sessionExpiredError;
      }

      return;
    }

    throw new Error(`Attempt to authenticate the request using an unsupported method: "${authMethod}"!`);
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
};
