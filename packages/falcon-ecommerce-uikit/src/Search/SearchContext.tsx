import React from 'react';
import { PaginationInput } from './../types';
import { SearchState } from './types';
import { SortOrder } from './../Category/SortOrdersQuery';

export type SearchContextType = {
  state: SearchState;
  availableSortOrders: SortOrder[];
  setFilter(name: string, value: string[]): void;
  removeFilter(name: string): void;
  removeAllFilters(): void;
  setSortOrder(sort: SortOrder): void;
  setTerm(term: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
  state: { filters: [] } as any,
  availableSortOrders: [],
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  removeAllFilters: () => {},
  setSortOrder: () => {},
  setPagination: () => {}
});

export const SearchConsumer = SearchContext.Consumer;
