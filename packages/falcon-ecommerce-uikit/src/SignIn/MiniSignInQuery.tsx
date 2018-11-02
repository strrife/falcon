import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_MINI_SIGN_IN = gql`
  query miniSignIn {
    miniSignIn @client {
      open
    }
  }
`;

export type MiniSignInData = {
  miniSignIn: {
    open: boolean;
  };
};

export class MiniSignInQuery extends Query<MiniSignInData> {
  static defaultProps = {
    query: GET_MINI_SIGN_IN
  };
}
