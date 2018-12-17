global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const { Cache, InMemoryLRUCache } = require('@deity/falcon-server-env');
const { codes } = require('@deity/falcon-errors');
const { BaseSchema } = require('@deity/falcon-server');
const { Schema } = require('@deity/falcon-shop-extension');
const { makeExecutableSchema } = require('graphql-tools');
const { EventEmitter2 } = require('eventemitter2');
const nock = require('nock');
const Magento2Api = require('./index');
const magentoResponses = require('./__mocks__/apiResponses');

const URL = 'http://example.com';
const ee = new EventEmitter2();
const apiConfig = {
  config: {
    host: 'example.com',
    protocol: 'http'
  },
  name: 'api-magento2',
  eventEmitter: ee,
  gqlServerConfig: {
    schema: makeExecutableSchema({
      typeDefs: [BaseSchema, Schema]
    })
  }
};
const createMagentoUrl = path => `/rest/default/V1${path}`;

describe('Magento2Api', () => {
  let api;
  let cache;

  beforeEach(() => {
    cache = new Cache(new InMemoryLRUCache());
    api = new Magento2Api(apiConfig);
    api.initialize({ context: {}, cache });
  });

  beforeAll(async () => {
    nock(URL)
      .persist(true)
      .post(createMagentoUrl('/integration/admin/token'))
      .reply(200, magentoResponses.adminToken.data);

    nock(URL)
      .persist(true)
      .get(createMagentoUrl('/store/storeConfigs'))
      .reply(200, [
        {
          locale: 'en_US',
          extension_attributes: {},
          code: 'default'
        }
      ]);

    nock(URL)
      .persist(true)
      .get(createMagentoUrl('/store/storeViews'))
      .reply(200, [
        {
          website_id: 1,
          code: 'default',
          store_group_id: 'bar',
          extension_attributes: {
            is_active: true
          }
        }
      ]);

    nock(URL)
      .persist(true)
      .get(createMagentoUrl('/store/storeGroups'))
      .reply(200, [
        {
          id: 'bar',
          website_id: 'oof'
        }
      ]);

    nock(URL)
      .persist(true)
      .get(createMagentoUrl('/store/websites'))
      .reply(200, [
        {
          id: 'oof'
        }
      ]);
  });

  afterAll(() => {
    nock.restore();
  });

  it('Should correctly fetch admin token', async () => {
    const result = await api.getAdminToken();
    expect(result).toEqual(magentoResponses.adminToken.data.token);
  });

  it('Should correctly fetch category data', async () => {
    nock(URL)
      .get(uri => /\/categories\/20/.test(uri)) // regexp as query params might be there
      .reply(200, magentoResponses.category.data);

    api.session.storeCode = '';
    const result = await api.category({}, { id: 20 });
    expect(result.data.id).toEqual(magentoResponses.category.data.id);
  });

  it('Should correctly handle request error without token', async () => {
    nock(URL)
      .get(uri => uri.indexOf(createMagentoUrl('/products') > 0))
      .reply(401, {
        message: 'Consumer is not authorized to access %resources',
        parameters: {
          resources: 'Magento_Catalog::categories'
        }
      });

    try {
      await api.products({}, {});
    } catch (error) {
      expect(error.extensions.code).toBe(codes.UNAUTHENTICATED);
      expect(error.message).toBe('Consumer is not authorized to access Magento_Catalog::categories');
      expect(error.extensions.response.status).toBe(401);
    }
  });

  it('Should correctly convert paths returned by Magento2 to urls', () => {
    expect(api.convertPathToUrl('test')).toBe('/test.html');
    // null should not not be converted
    expect(api.convertPathToUrl(null)).toBe(null);
  });

  it('Should not call signIn() after account creation if autoSignIn flag was set to false', async () => {
    // mock signIn resolver - just return promise that resolves to true
    api.signIn = jest.fn(() => Promise.resolve(true));

    nock(URL)
      .post(createMagentoUrl('/customers'))
      .reply(200, magentoResponses.user.signUpSuccess);

    nock(URL)
      .post(createMagentoUrl('/guest-carts'))
      .reply(200, {});

    const resp = await api.signUp(
      {},
      {
        input: { firstname: 'Test', lastname: 'Test', email: 'test@test.com', password: 'Deity123', autoSignIn: false }
      }
    );

    expect(api.signIn).toHaveBeenCalledTimes(0);
    expect(resp).toBe(true);
  });

  it('Should call signIn() with proper params after successful account creation (if autoSignIn flag was set to true)', async () => {
    // mock signIn resolver - just return promise that resolves to true
    api.signIn = jest.fn(() => Promise.resolve(true));

    nock(URL)
      .post(createMagentoUrl('/customers'))
      .reply(200, magentoResponses.user.signUpSuccess);

    nock(URL)
      .post(createMagentoUrl('/guest-carts'))
      .reply(200, {});

    const resp = await api.signUp(
      {},
      { input: { firstname: 'Test', lastname: 'Test', email: 'test@test.com', password: 'Deity123', autoSignIn: true } }
    );

    expect(api.signIn.mock.calls.length).toBe(1);
    expect(api.signIn.mock.calls[0][1]).toEqual({ input: { email: 'test@test.com', password: 'Deity123' } });
    expect(resp).toBe(true);
  });
});
