const { Extension } = require('@deity/falcon-server-env');
const { resolve } = require('path');
const typeDefs = require('fs').readFileSync(resolve(__dirname, 'schema.graphql'), 'utf8');

/**
 * Simple blog extension.
 *
 * Features:
 * - list posts
 * - show single post
 * - show shop products inside post
 */
module.exports = class Blog extends Extension {
  async getGraphQLConfig() {
    return {
      schema: [typeDefs],
      dataSources: {
        [this.api.name]: this.api
      },
      resolvers: {
        Query: {
          blogPost: async (...params) => this.api.blogPost(...params),
          blogPosts: async (...params) => this.api.blogPosts(...params)
        },
        BackendConfig: {
          blog: () => this.apiConfig
        }
      }
    };
  }

  async fetchUrl(...params) {
    return this.api.fetchUrl(...params);
  }
};
