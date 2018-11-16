import gql from 'graphql-tag';
import { Query } from '@deity/falcon-ecommerce-uikit';

export const GET_SIDEBAR_STATE = gql`
  query SIDEBAR_STATE {
    sidebar @client {
      contentType
      side
      open
    }
  }
`;

export class SidebarQuery extends Query {
  static defaultProps = {
    query: GET_SIDEBAR_STATE
  };
}
