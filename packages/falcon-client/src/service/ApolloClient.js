import { ApolloLink } from 'apollo-link';
import Apollo from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import deepMerge from 'deepmerge';

/**
 * @typedef {object} FalconApolloClientConfig
 * @property {boolean} [isBrowser=false] Boolean flag to determine the current environment
 * @property {object} [initialState={}] Object to restore Cache data from
 * @property {string} [serverUri="http://localhost:4000/graphql"] ApolloServer URL
 * @property {FalconApolloClientStateConfig} [clientState={}] Configuration of client state for Apollo
 */

/**
 * @typedef {object} FalconApolloClientStateConfig
 * @property {object} data https://www.apollographql.com/docs/react/essentials/local-state.html#cache-initialization
 * @property {object} resolvers https://www.apollographql.com/docs/react/essentials/local-state.html#local-resolvers
 */

/**
 * Creates an ApolloClient instance with the provided arguments
 * @param {FalconApolloClientConfig} config Falcon configuration for creating ApolloClient instance
 * @return {Apollo} ApolloClient instance
 */
export function ApolloClient(config = {}) {
  const {
    extraLinks = [],
    isBrowser = false,
    initialState = {},
    clientState = {},
    headers,
    apolloClientConfig,
    cache
  } = config;

  const { httpLink, connectToDevTools, ...restApolloClientConfig } = apolloClientConfig;
  const addTypename = false; // disabling 'addTypename' option to avoid manual setting "__typename" field

  const inMemoryCache = cache || new InMemoryCache({ addTypename }).restore(initialState);
  inMemoryCache.writeData({ data: clientState.data });

  const apolloHttpLink = createHttpLink({
    ...httpLink,
    fetch,
    credentials: 'include',
    headers
  });

  return new Apollo(
    deepMerge.all(
      [
        {
          addTypename,
          ssrMode: !isBrowser,
          cache: inMemoryCache,
          link: ApolloLink.from([...extraLinks, apolloHttpLink]),
          connectToDevTools: isBrowser && connectToDevTools,
          resolvers: clientState.resolvers
        },
        restApolloClientConfig
      ],
      { clone: false }
    )
  );
}
