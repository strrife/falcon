const { EndpointManager } = require('@deity/falcon-server-env');
const url = require('url');
const get = require('lodash/get');
const set = require('lodash/set');
const Logger = require('@deity/falcon-logger');

module.exports = class MagentoEndpoints extends EndpointManager {
  constructor(params) {
    super(params);
    this.resultHeader = this.config.resultHeader || 'Falcon-Result';
    this.customerTokenSessionPath = this.config.customerTokenSessionPath || 'magento2.customerToken.token';
    this.orderIdSessionPath = this.config.orderIdSessionPath || 'magento2.orderId';
    this.cartSessionPath = this.config.cartSessionPath || 'magento2.cart';
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
      const result = await this.handlePayPalCallback(ctx, isGuest);
      if (result.ok) {
        const body = await result.json();
        set(ctx.session, this.orderIdSessionPath, body.order_id);
        set(ctx.session, this.cartSessionPath, undefined);
        this.setResult(ctx, body.redirect);
      } else {
        this.setResult(ctx, 'failure');
      }
    };
  }

  handlePayPalCancel(isGuest = true) {
    return async ctx => {
      await this.handlePayPalCallback(ctx, isGuest);
      this.setResult(ctx, 'cancel');
    };
  }

  async handlePayPalCallback(ctx, isGuest) {
    const parsedUrl = url.parse(ctx.request.url);
    const targetUrl = url.format({
      protocol: this.config.protocol,
      host: this.config.host,
      pathname: parsedUrl.pathname,
      search: parsedUrl.search
    });

    Logger.debug(`Proxying ${ctx.request.url} to ${targetUrl}`);

    return this.fetch(targetUrl, {
      method: ctx.request.method,
      headers: this.getAuthHeaders(ctx, isGuest)
    });
  }

  setResult(ctx, result) {
    ctx.body = {
      type: 'payment',
      result
    };
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
