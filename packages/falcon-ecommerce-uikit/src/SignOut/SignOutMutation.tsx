import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_OUT_MUTATION = gql`
  mutation signOut {
    signOut
  }
`;

export class SignOutMutation extends Mutation {
  static defaultProps = {
    mutation: SIGN_OUT_MUTATION,
    refetchQueries: ['customer']
  };
}
