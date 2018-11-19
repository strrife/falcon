import { ApolloLink } from 'apollo-link';
import Apollo from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import deepMerge from 'deepmerge';

/**
 * @typedef {object} FalconApolloLinkStateConfig
 * @property {object} defaults https://www.apollographql.com/docs/link/links/state.html#defaults
 * @property {object} resolvers https://www.apollographql.com/docs/link/links/state.html#resolver
 */

/**
 * @typedef {object} FalconApolloClientConfig
 * @property {boolean} [isBrowser=false] Boolean flag to determine the current environment
 * @property {object} [initialState={}] Object to restore Cache data from
 * @property {string} [serverUri="http://localhost:4000/graphql"] ApolloServer URL
 * @property {FalconApolloLinkStateConfig} [clientState={}] https://www.apollographql.com/docs/link/links/state.html
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
    apolloClientConfig
  } = config;

  // disabling 'addTypename' option to avoid manual setting "__typename" field
  const addTypename = false;
  const cache = new InMemoryCache({ addTypename }).restore(initialState);
  const linkState = withClientState({
    cache,
    ...clientState
  });

  const { httpLink: httpLinkConfig, ...restApolloClientConfig } = apolloClientConfig;
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetchOptions: {},
    httpLinkConfig,
    fetch,
    headers
  });

  return new Apollo(
    deepMerge.all(
      [
        {
          connectToDevTools: isBrowser && process.env.NODE_ENV !== 'production',
          ssrMode: !isBrowser,
          addTypename,
          cache,
          link: ApolloLink.from([...extraLinks, linkState, httpLink])
        },
        restApolloClientConfig
      ],
      { clone: false }
    )
  );
}
