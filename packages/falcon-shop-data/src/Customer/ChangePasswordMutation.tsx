import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ChangePasswordInput } from '@deity/falcon-shop-extension';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

export type ChangePasswordVariables = {
  input: ChangePasswordInput;
};

export type ChangePasswordResponse = {
  changePassword: boolean;
};

export class ChangePasswordMutation extends Mutation<ChangePasswordResponse, ChangePasswordVariables> {
  static defaultProps = {
    mutation: CHANGE_PASSWORD
  };
}
