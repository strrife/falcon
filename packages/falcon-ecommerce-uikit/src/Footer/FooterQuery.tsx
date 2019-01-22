import gql from 'graphql-tag';
import { Query } from '../Query';
import { MenuItem } from '../Header';

const GET_FOOTER_DATA = gql`
  query FooterData {
    config @client {
      menus {
        footer {
          name
          children {
            name
            url
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
