const { EndpointManager } = require('@deity/falcon-server-env');
const proxies = require('koa-proxies');
const Logger = require('@deity/falcon-logger');

module.exports = class ProxyEndpoints extends EndpointManager {
  constructor(params) {
    super(params);

    if (!this.baseUrl) {
      throw new Error('"host" and "protocol" are required!');
    }
  }

  getEntries() {
    return this.config.entries.map(routePath => ({
      path: routePath,
      methods: 'all',
      handler: proxies(routePath, {
        target: this.baseUrl,
        changeOrigin: true,
        logs: this.config.logs || false,
        events: {
          proxyRes: (proxyRes, req) => {
            Logger.debug(
              `ProxyEndpoints: processing ${req.method} ${req.url} => ${this.baseUrl + req.url} (response code: ${
                proxyRes.statusCode
              })`
            );
          }
        }
      })
    }));
  }
};
