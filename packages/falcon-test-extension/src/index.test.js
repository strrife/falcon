global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const { mockServer } = require('graphql-tools');
const { BaseSchema } = require('@deity/falcon-server');
const { ApiDataSource } = require('@deity/falcon-server-env');
const TestStuff = require('.');

class CustomApi extends ApiDataSource {}

const mocks = {
  TestValue: () => ({
    id: 1,
    title: 'qwerty'
  })
};

const QUERY_TEST_CASES = [
  {
    name: 'post - should return correct post object',
    query: `
      query Post($keyword: String!) {
        testStuff(keyword: $keyword) {
          id
          title
        }
      }
    `,
    variables: {
      keyword: 'some-keyword'
    },
    expected: {
      data: {
        testStuff: {
          id: 1,
          title: 'qwerty'
        }
      }
    }
  }
];

describe('Falcon Blog Extension', () => {
  describe('Schema', () => {
    let schema;
    let server;
    beforeAll(async () => {
      const blog = new TestStuff({ extensionContainer: {} });
      blog.api = new CustomApi({});

      // prepare server with mocks for tests
      ({ schema } = await blog.getGraphQLConfig());
      schema.push(BaseSchema);
      server = mockServer(schema, mocks);
    });

    it('Should have valid type definitions', async () => {
      expect(async () => {
        await server.query(`{ __schema { types { name } } }`);
      }).not.toThrow();
    });

    QUERY_TEST_CASES.forEach(conf => {
      const { name, query, variables = {}, context = {}, expected } = conf;
      it(`Query: ${name}`, async () => expect(server.query(query, variables, context)).resolves.toEqual(expected));
    });
  });
});
