import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const TOGGLE_MINI_CART = gql`
  mutation {
    toggleMiniCart @client
  }
`;

export class ToggleMiniCartMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_CART
  };
}

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      itemId
      sku
      qty
      name
      price
      productType
    }
  }
`;

export class AddToCartMutation extends Mutation {
  static defaultProps = {
    mutation: ADD_TO_CART_MUTATION,
    refetchQueries: ['miniCart', 'cart']
  };
}

export const REMOVE_CART_ITEM_MUTATION = gql`
  mutation removeCartItem($input: RemoveCartItemInput!) {
    removeCartItem(input: $input)
  }
`;

export class RemoveCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: REMOVE_CART_ITEM_MUTATION,
    refetchQueries: ['miniCart', 'cart']
  };
}

export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      itemId
    }
  }
`;

export class UpdateCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: UPDATE_CART_ITEM,
    refetchQueries: ['miniCart', 'cart']
  };
}
