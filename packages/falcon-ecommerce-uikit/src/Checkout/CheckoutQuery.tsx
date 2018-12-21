import gql from 'graphql-tag';
import { Query } from '../Query/Query';
import { Order } from './../Order';

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
