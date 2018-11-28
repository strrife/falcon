import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation RequestCustomerPasswordResetToken($input: EmailInput!) {
    requestCustomerPasswordResetToken(input: $input)
  }
`;

export type RequestPasswordResetVariables = {
  email: string;
};

type RequestPasswordResetMutationVariables = {
  input: RequestPasswordResetVariables;
};

export class RequestPasswordResetMutation extends Mutation<{}, RequestPasswordResetMutationVariables> {
  static defaultProps = {
    mutation: REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION
  };
}
