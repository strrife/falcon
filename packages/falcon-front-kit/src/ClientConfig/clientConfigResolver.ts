import { IFieldResolver } from 'graphql-tools';
import { apolloStateToObject } from '../Apollo';

const CLIENT_CONFIG_PATH = '$ROOT_QUERY.config';

export const getClientConfigResolver: IFieldResolver<{}, any, { key: string }> = (_source, { key }, { cache }) => {
  key = key ? `${CLIENT_CONFIG_PATH}.${key}` : CLIENT_CONFIG_PATH;

  return apolloStateToObject(cache.data.data, key);
};
