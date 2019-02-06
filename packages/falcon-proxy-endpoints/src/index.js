const { EndpointManager } = require('@deity/falcon-server-env');
const proxies = require('koa-proxies');

module.exports = class ProxyEndpoints extends EndpointManager {
  getEntries() {
    return this.config.entries.map(routePath => ({
      path: routePath,
      method: 'all',
      handler: proxies(routePath, {
        target: this.baseUrl,
        changeOrigin: true,
        logs: this.config.logs || false
      })
    }));
  }
};
