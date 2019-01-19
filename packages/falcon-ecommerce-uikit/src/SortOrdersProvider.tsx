import React from 'react';
import gql from 'graphql-tag';
import { Query } from './Query';

export const SORT_ORDERS_QUERY = gql`
  query SortOrdersQuery {
    sortOrders @client
  }
`;

type SortOrder = {
  name: string;
  field: string;
  direction: string;
};

type SortOrdersProviderState = {
  active: SortOrder | null;
};

type SortOrdersProviderInjectedProps = {
  availableSortOrders: SortOrder[];
  activeSortOrder: SortOrder;
  setSortOrder(active: SortOrder): void;
};

type SortOrdersProviderProps = {
  children(props: SortOrdersProviderInjectedProps): any;
};

export class SortOrdersProvider extends React.Component<SortOrdersProviderProps, SortOrdersProviderState> {
  state = {
    active: null
  };

  setSortOrder = (active: SortOrder) => this.setState({ active });

  render() {
    return (
      <Query query={SORT_ORDERS_QUERY}>
        {({ sortOrders }) =>
          this.props.children({
            availableSortOrders: sortOrders,
            activeSortOrder: this.state.active || sortOrders[0],
            setSortOrder: this.setSortOrder
          })
        }
      </Query>
    );
  }
}
