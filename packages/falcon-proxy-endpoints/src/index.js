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

        try {
          const result = await fetch(`${this.baseUrl}${url}`, {
            method,
            headers: header,
            body: method === 'POST' ? params : undefined
          });
          ctx.status = result.status;

          // Removing "content-encoding" header
          result.headers.delete('content-encoding');

          // eslint-disable-next-line no-restricted-syntax
          for (const responseHeader of result.headers) {
            ctx.set(...responseHeader);
          }

          if (result.status === 200) {
            const text = await result.text();
            ctx.body = text;
            // Recalculating "content-length" (could be miscalculated due "gzip" flag)
            ctx.set('content-length', text.length);
          }

          Logger.debug(
            `ProxyEndpoints: processed ${method} ${url} => ${this.baseUrl + url} (status: ${result.status})`
          );
        } catch (e) {
          const status = {
            ECONNREFUSED: 503,
            ETIMEOUT: 504
          }[e.code];
          ctx.status = status || 500;
        }

        ctx.end();
      }
    }));
  }
};
