import gql from 'graphql-tag';
import { Query, FetchMore, ShopPageQuery, Pagination } from '../Query';
import { Order } from './../Order';

export const GET_ORDERS_LIST = gql`
  query Orders($page: Int = 1, $perPage: Int = 2) {
    orders(query: { page: $page, perPage: $perPage }) {
      items {
        incrementId
        createdAt
        customerFirstname
        customerLastname
        status
        grandTotal
        orderCurrencyCode
      }
      pagination {
        currentPage
        totalItems
        nextPage
      }
    }
  }
`;

export type OrdersData = {
  orders: {
    items: Order[];
    pagination: Pagination;
  };
};

const fetchMore: FetchMore<OrdersData, ShopPageQuery> = (data, apolloFetchMore) =>
  apolloFetchMore({
    variables: { page: data.orders.pagination.nextPage },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }

      return {
        ...prev,
        ...{
          orders: {
            ...prev.orders,
            items: [...prev.orders.items, ...fetchMoreResult.orders.items],
            pagination: { ...fetchMoreResult.orders.pagination }
          }
        }
      };
    }
  });

export class OrdersListQuery extends Query<OrdersData, ShopPageQuery> {
  static defaultProps = {
    query: GET_ORDERS_LIST,
    fetchMore,
    notifyOnNetworkStatusChange: true
  };
}
