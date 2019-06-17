import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RequestCustomerPasswordResetTokenInput } from '@deity/falcon-shop-extension';

export const REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation RequestCustomerPasswordResetToken($input: RequestCustomerPasswordResetTokenInput!) {
    requestCustomerPasswordResetToken(input: $input)
  }
`;

export type RequestPasswordResetTokenVariables = {
  input: RequestCustomerPasswordResetTokenInput;
};

export class RequestPasswordResetMutation extends Mutation<boolean, RequestPasswordResetTokenVariables> {
  static defaultProps = {
    mutation: REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION
  };
}
