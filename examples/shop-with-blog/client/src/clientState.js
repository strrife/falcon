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

export default {
  defaults: {
    miniCart: {
      open: false
    },
    miniSignUp: {
      open: false
    }
  },

  resolvers: {
    Query: {
      languages: () => languages,
      sortOrders: () => sortOrders
    },

    Mutation: {
      toggleMiniCart: (_, _variables, { cache }) => {
        const { miniCart } = cache.readQuery({
          query: gql`
            query miniCart {
              miniCart @client {
                open
              }
            }
          `
        });

        const data = {
          miniCart: { ...miniCart, open: !miniCart.open }
        };

        cache.writeData({ data });

        return null;
      },
      toggleMiniSignUp: (_, _variables, { cache }) => {
        const { miniSignUp } = cache.readQuery({
          query: gql`
            query miniSignUp {
              miniSignUp @client {
                open
              }
            }
          `
        });
        cache.writeData({
          data: {
            miniSignUp: { ...miniSignUp, open: !miniSignUp.open }
          }
        });

        return null;
      }
    }
  }
};
