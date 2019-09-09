import gql from 'graphql-tag';
import { Order, OrderItem } from '@deity/falcon-shop-extension';
import { Query } from '@deity/falcon-data';

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

export type LastOrderResponse = {
  lastOrder: Pick<Order, 'incrementId'> & {
    items: Pick<OrderItem, 'itemId' | 'name'>[];
  };
};

export class LastOrderQuery extends Query<LastOrderResponse> {
  static defaultProps = {
    query: GET_LAST_ORDER
  };
}
