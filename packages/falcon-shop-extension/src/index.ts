const { Extension } = require('@deity/falcon-server-env');
const { resolve } = require('path');
const typeDefs = require('fs').readFileSync(resolve(__dirname, '../src/schema.graphql'), 'utf8');

export * from './types';

/**
 * Extension that implements shop features
 */
export default class Shop extends Extension {
  async getGraphQLConfig() {
    const gqlConfig = await super.getGraphQLConfig(typeDefs);

    Object.assign(gqlConfig.resolvers, {
      PlaceOrderResult: {
        __resolveType: obj => (obj.url ? 'PlaceOrder3dSecureResult' : 'PlaceOrderSuccessfulResult')
      },
      BackendConfig: {
        // Returning an empty object to make ShopConfig resolvers work
        shop: () => ({})
      },
      ShopConfig: {
        activeCurrency: (_, __, context) => this.getApiSession(context).currency,
        activeStore: (_, __, context) => this.getApiSession(context).storeCode
      }
    });

    return gqlConfig;
  }
}
