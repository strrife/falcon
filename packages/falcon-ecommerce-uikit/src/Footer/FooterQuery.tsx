import gql from 'graphql-tag';
import { Query } from '../Query';
import { MenuItem } from '../Menu';

const GET_FOOTER_DATA = gql`
  query FooterData {
    config @client {
      menus {
        footer {
          name
          children {
            name
            urlPath
          }
        }
      }
    }
  }
`;

export type FooterData = {
  config: {
    menus: {
      footer: MenuItem[];
    };
  };
};

export class FooterQuery extends Query<FooterData, {}> {
  static defaultProps = {
    query: GET_FOOTER_DATA
  };
}
