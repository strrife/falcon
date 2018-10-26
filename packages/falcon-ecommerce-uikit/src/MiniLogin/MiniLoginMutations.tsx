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

export const SIGN_UP_MUTATION = gql`
  mutation signUp($input: SignUp!) {
    signUp(input: $input) {
      id
      firstname
      lastname
      email
    }
  }
`;

export class SignUpMutation extends Mutation {
  static defaultProps = {
    mutation: SIGN_UP_MUTATION
    // ,
    // refetchQueries: ['miniCart', 'cart']
  };
}
