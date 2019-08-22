import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ResetPasswordInput } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export type ResetPasswordResponse = {
  resetPassword: boolean;
};

export class ResetPasswordMutation extends Mutation<ResetPasswordResponse, OperationInput<ResetPasswordInput>> {
  static defaultProps = {
    mutation: RESET_PASSWORD_MUTATION
  };
}
