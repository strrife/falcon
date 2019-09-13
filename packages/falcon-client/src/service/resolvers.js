import { getClientConfigResolver } from '@deity/falcon-front-kit';

export const resolvers = {
  Query: {
    clientConfig: getClientConfigResolver
  }
};
