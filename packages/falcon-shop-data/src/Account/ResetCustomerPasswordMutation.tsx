import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ResetCustomerPasswordInput } from '@deity/falcon-shop-extension';

export const RESET_CUSTOMER_PASSWORD_MUTATION = gql`
  mutation ResetCustomerPassword($input: CustomerPasswordReset!) {
    resetCustomerPassword(input: $input)
  }
`;

export type ResetCustomerPasswordVariables = {
  input: ResetCustomerPasswordInput;
};

export class ResetCustomerPasswordMutation extends Mutation<boolean, ResetCustomerPasswordVariables> {
  static defaultProps = {
    mutation: RESET_CUSTOMER_PASSWORD_MUTATION
  };
}
