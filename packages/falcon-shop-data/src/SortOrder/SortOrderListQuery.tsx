import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { SortOrder } from './index';

export const GET_SORT_ORDER_LIST = gql`
  query SortOrderList {
    sortOrderList @client
  }
`;

export type SortOrderListResponse = {
  sortOrderList: SortOrder[];
};

export class SortOrderListQuery extends Query<SortOrderListResponse> {
  static defaultProps = {
    query: GET_SORT_ORDER_LIST
  };
}
