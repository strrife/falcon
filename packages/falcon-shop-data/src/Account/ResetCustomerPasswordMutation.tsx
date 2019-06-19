import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ResetPasswordInput } from '@deity/falcon-shop-extension';
import { InputArg } from '../types';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export type ResetPasswordResponse = {
  resetPassword: boolean;
};

export class ResetPasswordMutation extends Mutation<ResetPasswordResponse, InputArg<ResetPasswordInput>> {
  static defaultProps = {
    mutation: RESET_PASSWORD_MUTATION
  };
}
