import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CheckoutPaymentMethod } from './CheckoutLogic';

export type SetShippingData = {
  setShipping: {
    paymentMethods: CheckoutPaymentMethod[];
  };
};

export const SET_SHIPPING = gql`
  mutation SetShipping($input: ShippingInput) {
    setShipping(input: $input) {
      paymentMethods {
        code
        title
        config
      }
    }
  }
`;

export class SetShippingMutation extends Mutation {
  static defaultProps = {
    mutation: SET_SHIPPING
  };
}
