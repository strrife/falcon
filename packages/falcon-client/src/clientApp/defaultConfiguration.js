import deepMerge from 'deepmerge';

export default initialConfig =>
  deepMerge(
    {
      __typename: 'ClientConfig',
      logLevel: 'error',
      serverSideRendering: true,
      graphqlUrl: 'http://localhost:4000/graphql',
      apolloClient: {
        __typename: 'ApolloClientConfig',
        httpLink: {
          __typename: 'ApolloClientLinkConfig',
          uri: '/graphql',
          useGETForQueries: false
        },
        connectToDevTools: process.env.NODE_ENV !== 'production',
        defaultOptions: {
          __typename: 'ApolloClientDefaultOptions'
        },
        queryDeduplication: true
      },
      googleTagManager: {
        __typename: 'GTMConfig',
        id: null
      },
      i18n: {
        __typename: 'I18nConfig',
        lng: 'en',
        ns: ['common'],
        fallbackLng: 'en',
        whitelist: ['en'],
        // available: languages taken from falcon-server
        debug: false
      }
    },
    initialConfig || {},
    {
      arrayMerge: (destination, source) => source,
      clone: false
    }
  );
