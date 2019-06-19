import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ChangePasswordInput } from '@deity/falcon-shop-extension';
import { InputArg } from '../types';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

export type ChangePasswordResponse = {
  changePassword: boolean;
};

export class ChangePasswordMutation extends Mutation<ChangePasswordResponse, InputArg<ChangePasswordInput>> {
  static defaultProps = {
    mutation: CHANGE_PASSWORD
  };
}
