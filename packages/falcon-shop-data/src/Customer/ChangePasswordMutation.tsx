import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ChangePasswordInput } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

export type ChangePasswordResponse = {
  changePassword: boolean;
};

export class ChangePasswordMutation extends Mutation<ChangePasswordResponse, OperationInput<ChangePasswordInput>> {
  static defaultProps = {
    mutation: CHANGE_PASSWORD
  };
}
