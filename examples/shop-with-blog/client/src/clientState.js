import gql from 'graphql-tag';

/**
 * Defines client-side state resolvers
 */

const languages = [
  {
    name: 'English',
    code: 'en',
    active: false
  },
  {
    name: 'Dutch',
    code: 'nl',
    active: true
  }
];

const sortOrders = [
  {
    name: 'Price ascending',
    id: 'asc',
    active: true
  },
  {
    name: 'Price descending',
    id: 'desc'
  }
];

const MINI_CART_QUERY = gql`
  query miniCart {
    miniCart @client {
      open
    }
  }
`;

export default {
  defaults: {
    miniCart: {
      open: false
    }
  },

  resolvers: {
    Query: {
      languages: () => languages,
      sortOrders: () => sortOrders,

      // this resolver makes sure, that when refetchQuery is refreshing also miniCart its state will
      // be loaded from cache, not from defaults as we don't want refetch to toggle miniCart
      miniCart: (_, _variables, { cache }) => {
        const { miniCart } = cache.readQuery({
          query: MINI_CART_QUERY
        });
        return miniCart;
      }
    },

    Mutation: {
      toggleMiniCart: (_, _variables, { cache }) => {
        const { miniCart } = cache.readQuery({
          query: MINI_CART_QUERY
        });

        const data = {
          miniCart: { ...miniCart, open: !miniCart.open }
        };

        cache.writeData({ data });

        return null;
      }
    }
  }
};
