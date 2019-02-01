import { CachePersistor } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from './';

export const apolloClientWeb = ({ apolloInitialState, clientApolloSchema, apolloClientConfig }) => {
  const cache = new InMemoryCache({ addTypename: false });
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    key: '@deity/falcon-client/apollo-cache',
    debounce: 1000,
    debug: true
  });

  const restoreCache = cachePersistor => {
    const { navigator } = window;
    const online = navigator && navigator.onLine;

    if (online) {
      cachePersistor.purge().then(() => {
        cache.restore(apolloInitialState);
        return Promise.resolve();
      });
    }

    return cachePersistor.restore();
  };

  return restoreCache(persistor).then(() => {
    const apolloClient = new ApolloClient({
      isBrowser: true,
      clientState: clientApolloSchema,
      initialState: apolloInitialState,
      apolloClientConfig,
      cache
    });

    return Promise.resolve(apolloClient);
  });
};
