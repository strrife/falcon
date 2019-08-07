import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { CartItem } from '@deity/falcon-shop-extension';

export const GET_MINI_CART = gql`
  query MiniCart {
    cart {
      itemsQty
      quoteCurrency
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
  cart: {
    itemsQty: number;
    quoteCurrency: string;
    items: Pick<CartItem, 'itemId' | 'sku' | 'qty' | 'name' | 'price' | 'thumbnailUrl'>[];
  };
};

export class MiniCartQuery extends Query<MiniCartData> {
  static defaultProps = {
    query: GET_MINI_CART
  };
}
