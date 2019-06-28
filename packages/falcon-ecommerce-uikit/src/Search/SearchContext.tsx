import React from 'react';
import { SearchContextValue } from '@deity/falcon-front-kit';

export const SearchContext = React.createContext<SearchContextValue>({
  state: {
    filters: []
  },
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  removeFilters: () => {},
  setSortOrder: () => {},
  setPagination: () => {}
});

export const SearchConsumer = SearchContext.Consumer;
