const { EndpointManager } = require('@deity/falcon-server-env');
const url = require('url');
const get = require('lodash/get');
const set = require('lodash/set');

module.exports = class MagentoEndpoints extends EndpointManager {
  constructor(params) {
    super(params);
    this.resultHeader = this.config.resultHeader || 'Falcon-Result';
    this.customerTokenSessionPath = this.config.customerTokenSessionPath || 'magento2.customerToken.token';
    this.orderIdSessionPath = this.config.orderIdSessionPath || 'magento2.orderId';
  }

  getEntries() {
    return [...this.getPayPalCallbackEntries()];
  }

  getPayPalCallbackEntries() {
    return [
      {
        methods: 'GET',
        path: '/rest/*/V1/guest-carts/*/paypal-express-return',
        handler: this.handlePayPalReturn()
      },
      {
        methods: 'GET',
        path: '/rest/*/V1/guest-carts/*/paypal-express-cancel',
        handler: this.handlePayPalCancel()
      },
      {
        methods: 'GET',
        path: '/rest/*/V1/carts/mine/paypal-express-return',
        handler: this.handlePayPalReturn(false)
      },
      {
        methods: 'GET',
        path: '/rest/*/V1/carts/mine/paypal-express-cancel',
        handler: this.handlePayPalCancel(false)
      }
    ];
  }

  handlePayPalReturn(isGuest = true) {
    return async ctx => {
      const { redirect, order_id: orderId } = await this.handlePayPalCallback(ctx, isGuest);
      ctx.set(this.resultHeader, redirect);
      set(ctx.session, this.orderIdSessionPath, orderId);
      ctx.body = {};
    };
  }

  handlePayPalCancel(isGuest = true) {
    return async ctx => {
      await this.handlePayPalCallback(ctx, isGuest);
      ctx.set(this.resultHeader, 'cancel');
      ctx.body = {};
    };
  }

  async handlePayPalCallback(ctx, isGuest) {
    const parsedUrl = url.parse(ctx.request.url);
    const targetUrl = url.format({
      protocol: this.config.protocol,
      host: this.config.host,
      pathname: parsedUrl.pathname,
      search: parsedUrl.search.replace('PayerID', 'PayerId')
    });

    const result = await this.fetch(targetUrl, {
      method: ctx.request.method,
      headers: this.getAuthHeaders(ctx, isGuest)
    });
    return result.json();
  }

  /**
   * Generates Auth header (if required)
   * @param {object} ctx Koa context object
   * @param {boolean} isGuest Anonymous flag
   * @return {object} Headers object
   */
  getAuthHeaders(ctx, isGuest = true) {
    if (isGuest) {
      return {};
    }
    const token = get(ctx.session, this.customerTokenSessionPath);
    if (!token) {
      throw new Error('You are not authorized');
    }

    return {
      Authorization: `Bearer ${token}`
    };
  }
};
