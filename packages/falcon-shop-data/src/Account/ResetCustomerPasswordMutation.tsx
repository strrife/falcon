import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ResetPasswordInput } from '@deity/falcon-shop-extension';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export type ResetPasswordResponse = {
  resetPassword: boolean;
};

export type ResetPasswordVariables = {
  input: ResetPasswordInput;
};

export class ResetPasswordMutation extends Mutation<ResetPasswordResponse, ResetPasswordVariables> {
  static defaultProps = {
    mutation: RESET_PASSWORD_MUTATION
  };
}
