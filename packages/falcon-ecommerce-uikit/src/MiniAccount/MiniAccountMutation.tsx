import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const TOGGLE_MINI_ACCOUNT = gql`
  mutation {
    toggleMiniAccount @client
  }
`;

export class ToggleMiniAccountMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_ACCOUNT
  };
}
