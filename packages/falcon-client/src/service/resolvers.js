import { apolloStateToObject } from '@deity/falcon-front-kit';

export const resolvers = {
  Query: {
    // eslint-disable-next-line jsdoc/require-param
    /** TODO: move into @deity/falcon-front-kit */
    clientConfig: (_, { key }, { cache }) => {
      const keyPrefix = '$ROOT_QUERY.config';
      key = key ? `${keyPrefix}.${key}` : keyPrefix;

      return apolloStateToObject(cache.data.data, key);
    }
  }
};
