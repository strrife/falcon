import gql from 'graphql-tag';
import { Query } from '../Query';
import { SortOrder } from './SortOrder';

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
