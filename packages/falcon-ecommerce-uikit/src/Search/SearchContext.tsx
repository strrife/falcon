import React from 'react';
import { SearchState, FilterInput, SortOrderInput, PaginationInput } from './index.d';

export type SearchContextType = {
  state: SearchState;
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
  setSortOrder(sort: SortOrderInput): void;
  setQuery(query: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
  state: {},
  setFilter: () => {},
  removeFilter: () => {},
  setSortOrder: () => {},
  setQuery: () => {},
  setPagination: () => {}
});
