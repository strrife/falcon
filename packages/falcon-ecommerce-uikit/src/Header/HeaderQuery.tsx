import gql from 'graphql-tag';
import { Query } from '../Query/Query';
import { MenuItem } from '../Menu';

const GET_HEADER_DATA = gql`
  query HeaderData {
    config @client {
      menus {
        banner {
          name
          urlPath
        }
      }
    }
  }
`;

export type HeaderData = {
  config: {
    menus: {
      banner: MenuItem[];
    };
  };
};

export class HeaderQuery extends Query<HeaderData> {
  static defaultProps = {
    query: GET_HEADER_DATA
  };
}
