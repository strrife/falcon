import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { EmailInput } from '@deity/falcon-shop-extension';

export const REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation RequestCustomerPasswordResetToken($input: EmailInput!) {
    requestCustomerPasswordResetToken(input: $input)
  }
`;

export type RequestPasswordResetVariables = {
  input: EmailInput;
};

export class RequestPasswordResetMutation extends Mutation<boolean, RequestPasswordResetVariables> {
  static defaultProps = {
    mutation: REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION
  };
}
