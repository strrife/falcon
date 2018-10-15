import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_MINI_CART = gql`
  query miniCart {
    miniCart @client {
      open
    }
    cart {
      itemsQty
      items {
        itemId
        sku
        qty
        name
        price
        thumbnailUrl
      }
    }
  }
`;

export type MiniCartData = {
  miniCart: {
    open: boolean;
  };
  cart: {
    itemsQty: number;
    items: any[];
  };
};

export class MiniCartQuery extends Query<MiniCartData> {
  static defaultProps = {
    query: GET_MINI_CART
  };
}
