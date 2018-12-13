const { mockServer } = require('graphql-tools');
const { EventEmitter2 } = require('eventemitter2');
const ExtensionContainer = require('./ExtensionContainer');
const { BaseSchema } = require('../index');

const extensions = {
  shop: {
    package: 'fake-shop-extension',
    config: {
      apiUrl: 'https://example.com'
    }
  },
  reviews: {
    package: 'fake-product-reviews-extension'
  }
};

const mocks = {
  Product: () => ({
    id: 1,
    name: 'test product'
  }),

  Review: () => ({
    id: 2,
    content: 'review content'
  })
};

describe('ExtensionContainer', () => {
  let container;
  let ee;

  beforeEach(async () => {
    ee = new EventEmitter2();
    container = new ExtensionContainer(ee);
    await container.registerExtensions(extensions);
  });

  it('Should correctly load extensions passed in configuration', async () => {
    expect(container.extensions.size).toEqual(2);
  });

  it('Should correctly pass configuration to extensions', () => {
    expect(container.extensions.get('shop').config.apiUrl).toEqual('https://example.com');
  });

  it('Should merge objects', () => {
    const testCases = [
      [
        [
          {
            locales: ['en_US']
          },
          {
            locales: ['pl_PL']
          }
        ],
        {
          locales: []
        }
      ],
      [
        [
          {
            locales: ['en_US', 'nl_NL']
          },
          {
            locales: ['pl_PL', 'en_US']
          }
        ],
        {
          locales: ['en_US']
        }
      ],
      [
        [
          {
            foo: 'bar'
          },
          {
            locales: ['pl_PL', 'en_US']
          },
          null
        ],
        {
          locales: ['pl_PL', 'en_US']
        }
      ]
    ];

    testCases.forEach(([incoming, expected]) => {
      expect(container.mergeConfigs(incoming)).toEqual(expected);
    });
  });

  describe('Schema stitching', () => {
    it('Should not throw errors during GraphQL config computing', () => {
      expect(async () => {
        await container.createGraphQLConfig({
          schemas: [BaseSchema]
        });
      }).not.toThrow();
    });

    it('Should produce proper schema from schemas returned by extensions', async () => {
      const query = `
        {
          __type(name: "Product") {
            name
            fields {
              name
            }
          }
        }
      `;
      const { schema } = await container.createGraphQLConfig({
        schemas: [BaseSchema]
      });
      const server = mockServer(schema, mocks);
      const result = await server.query(query);
      expect(result.data.__type.fields.length).toEqual(3); // eslint-disable-line no-underscore-dangle
    });
  });
});
