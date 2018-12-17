import gql from 'graphql-tag';
import { Query, ShopPageQuery } from '../Query';
import { Order } from './../Order';

export const GET_ORDERS_LIST = gql`
  query Orders($page: Int = 1, $perPage: Int = 10) {
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
    }
  }
`;

export type OrdersData = {
  items: Order[];
};

export class OrdersListQuery extends Query<OrdersData, ShopPageQuery> {
  static defaultProps = {
    query: GET_ORDERS_LIST
  };
}
