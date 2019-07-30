import gql from 'graphql-tag';
import { CartItem, CartItemOption, CartTotal } from '@deity/falcon-shop-extension';
import { Query } from '@deity/falcon-data';

export const GET_CART = gql`
  query Cart {
    cart {
      itemsQty
      quoteCurrency
      couponCode
      totals {
        code
        title
        value
      }
      items {
        itemId
        sku
        qty
        name
        price
        rowTotalInclTax
        thumbnailUrl
        itemOptions {
          label
          value
        }
      }
    }
  }
`;

export type CartResponse = {
  cart: {
    itemsQty: number;
    quoteCurrency: string;
    couponCode: string;
    totals: CartTotal[];
    items: Pick<CartItem, 'itemId' | 'sku' | 'qty' | 'name' | 'price' | 'rowTotalInclTax' | 'thumbnailUrl'> & {
      itemOptions: Pick<CartItemOption, 'label' | 'value'>[];
    };
  };
};

export class CartQuery extends Query<CartResponse> {
  static defaultProps = {
    query: GET_CART
  };
}
