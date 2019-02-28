const { EndpointManager } = require('@deity/falcon-server-env');
const Logger = require('@deity/falcon-logger');
const fetch = require('node-fetch');
const { parse } = require('url');
const qs = require('qs');
const get = require('lodash.get');

module.exports = class ProxyEndpoints extends EndpointManager {
  constructor(params) {
    super(params);
    // Object path to get an orderId from the session:
    // Example session object: { magento2: { orderId: xx } }
    this.orderIdSessionPath = this.config.orderIdSessionPath || 'magento2.orderId';

    if (!this.baseUrl) {
      throw new Error('"host" and "protocol" are required!');
    }
  }

  getEntries() {
    return this.config.entries.map(route => ({
      methods: 'ALL',
      path: route,
      handler: async ctx => {
        const { request, session } = ctx;
        const { body: requestBody, method, url, header } = request;
        let params = '';

        // Altering "user-agent" with "DeityFalcon" suffix
        header['user-agent'] = `${header['user-agent']} DeityFalcon`;
        header.host = parse(this.baseUrl).host;

        if (method === 'POST' && requestBody) {
          // Passing "orderId" information from the session
          requestBody.order_id = get(session, this.orderIdSessionPath);
          params = qs.stringify(requestBody);
        }

        Logger.debug(`ProxyEndpoints: processed ${method} ${url} => ${this.baseUrl + url}`);
        try {
          ctx.body = fetch(`${this.baseUrl}${url}`, {
            method,
            headers: header,
            body: method === 'POST' ? params : undefined
          });
        } catch (e) {
          const status = {
            ECONNREFUSED: 503,
            ETIMEOUT: 504
          }[e.code];
          ctx.status = status || 500;
        }
      }
    }));
  }
};
