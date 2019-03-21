import React from 'react';
import { SearchState, SortOrder, PaginationInput } from './types';

export type SearchContextType = {
  state: SearchState;
  availableSortOrders: SortOrder[];
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
  setSortOrder(sort: SortOrder): void;
  setTerm(term: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
  state: {},
  availableSortOrders: [],
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  setSortOrder: () => {},
  setPagination: () => {}
});

export const SearchConsumer = SearchContext.Consumer;
