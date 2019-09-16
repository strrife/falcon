import { getClientConfigResolver } from '@deity/falcon-front-kit';
import { openSidebarResolver, closeSidebarResolver } from 'src/components/Sidebar';

/**
 * Defines client-side state resolvers
 */

const sortOrders = [
  {
    name: 'Position',
    value: undefined,
    __typename: 'SortOrder'
  },
  {
    name: 'Price ascending',
    value: {
      field: 'price',
      direction: 'asc',
      __typename: 'SortOrderValue'
    },
    __typename: 'SortOrder'
  },
  {
    name: 'Price descending',
    value: {
      field: 'price',
      direction: 'desc',
      __typename: 'SortOrderValue'
    },
    __typename: 'SortOrder'
  },
  {
    name: 'Name ascending',
    value: {
      field: 'name',
      direction: 'asc',
      __typename: 'SortOrderValue'
    },
    __typename: 'SortOrder'
  },
  {
    name: 'Name descending',
    value: {
      field: 'name',
      direction: 'desc',
      __typename: 'SortOrderValue'
    },
    __typename: 'SortOrder'
  }
];

export default {
  data: {
    sidebar: {
      contentType: null,
      side: 'right',
      isOpen: false,
      __typename: 'SidebarStatus'
    }
  },

  resolvers: {
    Query: {
      clientConfig: getClientConfigResolver,
      sortOrderList: () => sortOrders
    },

    Mutation: {
      openSidebar: openSidebarResolver,
      closeSidebar: closeSidebarResolver
    }
  }
};
