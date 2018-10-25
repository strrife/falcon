import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_MINI_LOGIN = gql`
  query miniLogin {
    miniLogin @client {
      open
    }
  }
`;

export type MiniLoginData = {
  miniLogin: {
    open: boolean;
  };
};

export class MiniLoginQuery extends Query<MiniLoginData> {
  static defaultProps = {
    query: GET_MINI_LOGIN
  };
}
