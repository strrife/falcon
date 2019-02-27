const config = require('config');
const { endpoints } = require('@deity/falcon-client/src/bootstrap/endpoints');

export default {
  config: { ...config },
  // onServerCreated: server => { console.log('created'); },
  // onServerInitialized: server => { console.log('initialized'); },
  // onServerStarted: server => { console.log('started'); }
  onRouterCreated: router => endpoints(router, config.apolloClient.httpLink.uri, '/checkout/confirmation')
};
