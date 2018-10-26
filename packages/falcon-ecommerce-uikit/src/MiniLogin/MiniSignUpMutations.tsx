import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const TOGGLE_MINI_SIGN_UP = gql`
  mutation {
    toggleMiniSignUp @client
  }
`;

export class ToggleMiniSignUpMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_SIGN_UP
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
