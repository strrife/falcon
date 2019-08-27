import { apolloStateToObject } from './apolloStateToObject';

export const resolvers = {
  Query: {
    /** TODO: move into @deity/falcon-front-kit */
    clientConfig: (_, { key }, { cache }) => {
      const keyPrefix = '$ROOT_QUERY.config';
      key = key ? `${keyPrefix}.${key}` : keyPrefix;

      return apolloStateToObject(cache.data.data, key);
    }
  }
};
