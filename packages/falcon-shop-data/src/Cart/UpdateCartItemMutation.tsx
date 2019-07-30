import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { UpdateCartItemInput, CartItemPayload } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      itemId
    }
  }
`;

export type UpdateCartItemResponse = {
  updateCartItem: Pick<CartItemPayload, 'itemId'>;
};

export class UpdateCartItemMutation extends Mutation<UpdateCartItemResponse, OperationInput<UpdateCartItemInput>> {
  static defaultProps = {
    mutation: UPDATE_CART_ITEM,
    refetchQueries: ['MiniCart', 'Cart']
  };
}
