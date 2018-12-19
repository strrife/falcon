import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export type Order = {
  incrementId: string;
  createdAt?: string;
  customerFirstname?: string;
  customerLastname?: string;
  status?: string; // list of possible statuses?
  grandTotal?: string;
  orderCurrencyCode?: string;
  items: OrderItem[];
};

export type OrderItem = {
  itemId: number;
  name: string;
};

export const GET_LAST_ORDER = gql`
  query LastOrder {
    lastOrder {
      incrementId
      items {
        itemId
        name
      }
    }
  }
`;

export class LastOrderQuery extends Query<Order> {
  static defaultProps = {
    query: GET_LAST_ORDER
  };
}
