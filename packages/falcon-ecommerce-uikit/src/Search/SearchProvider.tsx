import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SearchState, FilterInput, FilterOperator, SortOrderInput, PaginationInput } from './index.d';
import { searchStateFromURL } from './searchStateFromURL';
import { searchStateToURL } from './searchStateToURL';

export type SearchProviderInjectedProps = {
  activeFilters: FilterInput[];
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
  setSortOrder(sort: SortOrderInput): void;
  setQuery(query: string): void;
  setPagination(pagination: PaginationInput): void;
};

export type SearchProviderOwnProps = {
  searchStateToURL?(state: SearchState): string;
  searchStateFromURL?(url: string): SearchState;
  children(props: SearchProviderInjectedProps): any;
};

export type SearchProviderProps = SearchProviderOwnProps & RouteComponentProps<any>;

class SearchProviderImpl extends React.Component<SearchProviderProps, SearchState> {
  static defaultProps = {
    searchStateFromURL,
    searchStateToURL
  };

  constructor(props: SearchProviderProps) {
    super(props);
    this.state = props.searchStateFromURL!(props.location.search);
    this.historyUnlisten = () => {};
  }

  componentDidMount() {
    this.historyUnlisten = this.props.history.listen(this.restoreStateFromURL);
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  setFilter = (field: string, value: string[], operator = FilterOperator.eq) => {
    const filters = this.state.filters ? [...this.state.filters] : [];
    let filter = filters.find(item => item.field === field);

    if (!filter) {
      filter = {
        operator,
        field,
        value
      };
      filters.push(filter);
    } else {
      filter.operator = operator;
      filter.value = value;
    }

    this.updateURL({
      ...this.state,
      filters
    });
  };

  setSortOrder = (sort: SortOrderInput) => {
    this.updateURL({
      ...this.state,
      sort
    });
  };

  setPagination = (pagination: PaginationInput) => {
    this.updateURL({
      ...this.state,
      pagination
    });
  };

  setQuery = (query: string) => {
    this.updateURL({
      ...this.state,
      query
    });
  };

  removeFilter = (field: string) => {
    if (!this.state.filters) {
      return;
    }

    const filters = this.state.filters.filter(filter => filter.field !== field);

    this.updateURL({
      ...this.state,
      filters
    });
  };

  private historyUnlisten: Function;

  updateURL(state: SearchState) {
    const queryString = this.props.searchStateToURL!(state);
    this.props.history.push(`${this.props.location.pathname}?${queryString}`);
  }

  restoreStateFromURL = (location: any) => {
    const state = this.props.searchStateFromURL!(location.search);
    this.setState(state);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          activeFilters: this.state.filters || [],
          setFilter: this.setFilter,
          removeFilter: this.removeFilter,
          setSortOrder: this.setSortOrder,
          setPagination: this.setPagination,
          setQuery: this.setQuery
        })}
      </React.Fragment>
    );
  }
}

export const SearchProvider = withRouter(SearchProviderImpl);
