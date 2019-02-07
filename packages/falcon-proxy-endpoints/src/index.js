const { EndpointManager } = require('@deity/falcon-server-env');
const proxies = require('koa-proxies');

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
        logs: this.config.logs || false
      })
    }));
  }
};
