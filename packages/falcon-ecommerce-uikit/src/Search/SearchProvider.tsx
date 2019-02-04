import React from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';

export type FilterValues = {
  [name: string]: string[];
};

export type SearchProviderInjectedProps = {
  activeFilters: FilterValues;
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
};

export type SearchProviderProps = {
  filtersToURL?(filters: FilterValues): any;
  filtersFromURL?(url: string): any;
  children(props: SearchProviderInjectedProps): any;
};

export type SearchProviderState = {
  activeFilters: FilterValues;
};

class SearchProviderImpl extends React.Component<SearchProviderProps & RouteComponentProps<any>, SearchProviderState> {
  state = {
    activeFilters: {}
  };

  setFilter = (name: string, value: string[]) => {
    this.setState(state => {
      state.activeFilters[name] = value;
      return state;
    });
  };

  removeFilter = (name: string) => {
    this.setState(state => {
      delete state.activeFilters[name];
      return state;
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          activeFilters: this.state.activeFilters,
          setFilter: this.setFilter,
          removeFilter: this.removeFilter
        })}
      </React.Fragment>
    );
  }
}

export const SearchProvider = withRouter(SearchProviderImpl);
