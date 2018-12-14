const fetch = require('node-fetch');
const { Extension } = require('@deity/falcon-server-env');
const { HttpLink } = require('apollo-link-http');
const { introspectSchema, makeRemoteExecutableSchema, delegateToSchema } = require('graphql-tools');

class MagentoSearch extends Extension {
  async getGraphQLConfig() {
    const link = new HttpLink({ uri: 'http://magento-test.deity.io/graphql', fetch });
    const schema = await introspectSchema(link);

    const remoteSchema = makeRemoteExecutableSchema({
      schema,
      link
    });

    return {
      schema: remoteSchema,
      resolvers: {
        Query: {
          async search(parent, params, context, info) {
            // console.log('-------------> search resolver', info);
            debugger;
            const result = /* await info.mergeInfo */ await delegateToSchema({
              schema: remoteSchema,
              operation: 'query',
              fieldName: 'products',
              args: {
                // search: params.query
              },
              context,
              info
            })
              .then(res => console.log('res', res), rej => console.log('rej', rej))
              .catch(ex => console.log('ex', ex));

            debugger;
            return result;
          }
        }
      }
    };
  }
}

module.exports = MagentoSearch;
