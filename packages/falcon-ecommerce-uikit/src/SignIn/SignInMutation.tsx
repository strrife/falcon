import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignIn!) {
    signIn(input: $input)
  }
`;

export class SignInMutation extends Mutation {
  static defaultProps = {
    mutation: SIGN_IN_MUTATION,
    awaitRefetchQueries: true,
    refetchQueries: ['customer', 'miniAccount']
  };
}
