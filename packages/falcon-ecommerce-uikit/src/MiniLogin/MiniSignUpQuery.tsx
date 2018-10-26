import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_MINI_SIGN_UP = gql`
  query miniSignUp {
    miniSignUp @client {
      open
    }
  }
`;

export type MiniSignUpData = {
  miniSignUp: {
    open: boolean;
  };
};

export class MiniSignUpQuery extends Query<MiniSignUpData> {
  static defaultProps = {
    query: GET_MINI_SIGN_UP
  };
}
