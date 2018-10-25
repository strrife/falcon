import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const TOGGLE_MINI_LOGIN = gql`
  mutation {
    toggleMiniLogin @client
  }
`;

export class ToggleMiniLoginMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_LOGIN
  };
}
