import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// eslint-disable-next-line
import { Location } from 'history';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { SearchState, FilterOperator, SortOrder, PaginationInput } from './types';
import { searchStateFromURL } from './searchStateFromURL';
import { searchStateToURL } from './searchStateToURL';
import { SearchContext } from './SearchContext';

export const SORT_ORDERS_QUERY = gql`
  query SortOrdersQuery {
    sortOrders @client
  }
`;

interface SearchProviderProps extends RouteComponentProps {
  searchStateFromURL?(url: string): Partial<SearchState>;
  searchStateToURL?(state: Partial<SearchState>): string;
  sortOrders: SortOrder[];
}

class SearchProviderImpl extends React.Component<SearchProviderProps, SearchState> {
  static defaultProps = {
    searchStateFromURL,
    searchStateToURL,
    filters: [],
    sortOrders: []
  };

  constructor(props: SearchProviderProps) {
    super(props);

    this.state = this.getStateFromURL(props.location);
  }

  componentDidMount() {
    this.historyUnlisten = this.props.history.listen(this.restoreStateFromURL);
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  getStateFromURL(location: Location): SearchState {
    const { sort, filters, ...rest } = this.props.searchStateFromURL!(location.search);

    return {
      ...rest,
      filters: Array.isArray(filters) ? filters : [],
      // if there's no sort set yet then return first available option (it's considered as default one)
      sort: (sort && this.getFullSortOrderDefinition(sort)) || this.props.sortOrders[0]
    };
  }

  getFullSortOrderDefinition = (sort: SortOrder) =>
    this.props.sortOrders.find(item => item.field === sort.field && item.direction === sort.direction);

  setFilter = (field: string, value: string[], operator: FilterOperator = 'eq') => {
    const filters = [...this.state.filters];
    const filter = filters.find(item => item.field === field);

    if (!filter) {
      filters.push({ field, value, operator });
    } else {
      filter.operator = operator;
      filter.value = value;
    }

    this.updateURL({
      ...this.state,
      filters
    });
  };

  setSortOrder = (sort: SortOrder) => {
    const sortItem = this.getFullSortOrderDefinition(sort);
    if (!sortItem) {
      throw new Error(
        'Sort order value passed to SearchProvider.setSortOrder() does not match any of available sort orders'
      );
    }

    this.updateURL({
      ...this.state,
      sort: sortItem
    });
  };

  setPagination = (pagination: PaginationInput) => {
    this.updateURL({
      ...this.state,
      pagination
    });
  };

  setTerm = (term: string) => {
    this.updateURL({
      ...this.state,
      term
    });
  };

  removeFilter = (field: string) => {
    this.updateURL({
      ...this.state,
      filters: this.state.filters.filter(filter => filter.field !== field)
    });
  };

  private historyUnlisten = () => {};

  updateURL(state: SearchState) {
    const queryString = this.props.searchStateToURL!(state);
    this.props.history.push(`${this.props.location.pathname}?${queryString}`);
  }

  restoreStateFromURL = (location: any) => {
    const state = this.getStateFromURL(location);
    // state created from URL might be empty so we have to make sure that all the items are correctly
    // removed from current state - setting undefined for non existing value will do the trick
    Object.keys(this.state).forEach(key => {
      if (!(key in state)) {
        state[key as keyof SearchState] = undefined;
      }
    });

    this.setState(state);
  };

  render() {
    return (
      <SearchContext.Provider
        value={{
          state: {
            ...this.state,
            // if there's no sort set yet then return first available option (it's considered as default one)
            sort: this.state.sort || this.props.sortOrders[0]
          },
          availableSortOrders: this.props.sortOrders,
          setFilter: this.setFilter,
          removeFilter: this.removeFilter,
          setSortOrder: this.setSortOrder,
          setPagination: this.setPagination,
          setTerm: this.setTerm
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

// wrap SearchProviderImpl with SORT_ORDERS_QUERY so sort orders are passed as props to SearchProviderImpl
const SearchProviderWithSortOrders = graphql<any, { sortOrders: SortOrder[] }>(SORT_ORDERS_QUERY, {
  // remap data received from apollo - return sortOrders directly
  props: ({ data, ownProps }) => ({
    sortOrders: data!.sortOrders,
    ...ownProps
  })
})(SearchProviderImpl);

// wrap everything in router so SearchProviderImpl has access to history and location
export const SearchProvider = withRouter(SearchProviderWithSortOrders);
