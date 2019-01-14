import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignIn!) {
    signIn(input: $input)
  }
`;

export type SignInInput = {
  email: string;
  password: string;
};

export class SignInMutation extends Mutation<{ signIn: boolean }, { input: SignInInput }> {
  static defaultProps = {
    mutation: SIGN_IN_MUTATION,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'CustomerWithAddresses', 'MiniAccount', 'Cart']
  };
}
