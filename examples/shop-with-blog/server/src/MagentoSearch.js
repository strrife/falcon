const fetch = require('node-fetch');
const { Extension } = require('@deity/falcon-server-env');
const { HttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  transformSchema,
  // delegateToSchema,
  // FilterRootFields,
  RenameTypes,
  RenameRootFields,
  WrapQuery
} = require('graphql-tools');

class MagentoSearch extends Extension {
  async getGraphQLConfig() {
    const link = new HttpLink({ uri: 'http://magento-test.deity.io/graphql', fetch });
    const schema = await introspectSchema(link);

    const remoteSchema = makeRemoteExecutableSchema({
      schema,
      link
    });

    const transformedSchema = transformSchema(remoteSchema, [
      // new FilterRootFields((operation: string, rootField: string) => rootField !== 'chirpsByAuthorId'),
      new RenameTypes(name => `Magento_${name}`),
      new RenameRootFields((operation, name) => `Magento_${name}`)
    ]);

    return {
      // schema: remoteSchema,
      schema: transformedSchema,
      resolvers: {
        Query: {
          async myStoreConfig(parent, params, context, info) {
            debugger;
            const result = await info.mergeInfo.delegateToSchema({
              // schema: remoteSchema,
              schema: transformedSchema,
              operation: 'query',
              fieldName: 'Magento_storeConfig',
              args: {},
              context,
              info
            });
            console.log('RESULT', result);
            return result;
          },

          // async search2(parent, params, context, info) {
          //   // console.log('-------------> search resolver', info);
          //   debugger;
          //   const result = await info.mergeInfo.delegateToSchema({
          //     // schema: remoteSchema,
          //     schema: transformedSchema,
          //     operation: 'query',
          //     fieldName: 'Magento_products',
          //     // fieldName: 'products',
          //     args: {
          //       search: params.query
          //     },
          //     context,
          //     info
          //     // transforms: [
          //     //   new RenameTypes(name => `Magento_${name}`),
          //     //   new RenameRootFields((operation, name) => `Magento_${name}`)
          //     // ]
          //   });

          //   console.log('result', result);
          //   return result;
          // },

          async search(parent, params, context, info) {
            // console.log('-------------> search resolver', info);
            debugger;
            const result = await info.mergeInfo.delegateToSchema({
              // schema: remoteSchema,
              schema: transformedSchema,
              operation: 'query',
              fieldName: 'Magento_products',
              // fieldName: 'products',
              args: {
                search: params.query
              },
              context,
              info,
              transforms: [
                new WrapQuery(
                  ['Magento_products'],
                  subtree => {
                    debugger;
                    return subtree.selections[0].selectionSet;
                  },
                  res => {
                    debugger;
                    return {
                      products: res
                    };
                  }
                )
                //   new RenameTypes(name => `Magento_${name}`),
                //   new RenameRootFields((operation, name) => `Magento_${name}`)
              ]
            });

            console.log('result', result);
            return result;
          }
        }
      }
    };
  }
}

module.exports = MagentoSearch;
