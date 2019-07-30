import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignIn!) {
    signIn(input: $input)
  }
`;

export type SignInModel = {
  email: string;
  password: string;
};
export type SignInData = { signIn: boolean };

export class SignInMutation extends Mutation<SignInData, { input: SignInModel }> {
  static defaultProps = {
    mutation: SIGN_IN_MUTATION,
    refetchQueries: ['MiniAccount', 'Cart', 'CustomerWithAddresses', 'Customer']
  };
}
