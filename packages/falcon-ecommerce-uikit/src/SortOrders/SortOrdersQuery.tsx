import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const SORT_ORDERS_QUERY = gql`
  query SortOrdersQuery {
    sortOrders @client
  }
`;

export type SortOrderDirection = 'asc' | 'desc';

export type SortOrderInput = {
  field: string;
  direction: SortOrderDirection;
};

export type SortOrder = SortOrderInput & {
  name: string;
};

export type SortOrdersData = {
  sortOrders: SortOrder[];
};

export class SortOrdersQuery extends Query<SortOrdersData> {
  static defaultProps = {
    query: SORT_ORDERS_QUERY
  };
}

export const AreSortOrdersSame = (a: SortOrderInput, b: SortOrderInput): boolean =>
  a.field === b.field && a.direction === b.direction;
