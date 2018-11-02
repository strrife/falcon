import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const TOGGLE_MINI_SIGN_IN = gql`
  mutation {
    toggleMiniSignIn @client
  }
`;

export class ToggleMiniSignInMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_SIGN_IN
  };
}
