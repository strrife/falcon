import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ResetCustomerPasswordInput } from '@deity/falcon-shop-extension';

export const RESET_CUSTOMER_PASSWORD_MUTATION = gql`
  mutation ResetCustomerPassword($input: CustomerPasswordReset!) {
    resetCustomerPassword(input: $input)
  }
`;

type ResetCustomerPasswordMutationVariables = {
  input: ResetCustomerPasswordInput;
};

export class ResetCustomerPasswordMutation extends Mutation<boolean, ResetCustomerPasswordMutationVariables> {
  static defaultProps = {
    mutation: RESET_CUSTOMER_PASSWORD_MUTATION
  };
}
