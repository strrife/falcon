import React from 'react';
import { SearchState, SortOrder, SortOrderInput, PaginationInput } from './index.d';

export type SearchContextType = {
  state: SearchState;
  availableSortOrders: SortOrder[];
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
  setSortOrder(sort: SortOrderInput): void;
  setQuery(query: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
  state: {},
  availableSortOrders: [],
  setFilter: () => {},
  removeFilter: () => {},
  setSortOrder: () => {},
  setQuery: () => {},
  setPagination: () => {}
});
