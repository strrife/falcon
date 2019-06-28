import React from 'react';
import { SortOrderInput, PaginationInput } from '@deity/falcon-data';
import { FilterOperator, FilterInput } from '@deity/falcon-shop-extension';

export type SearchState = {
  term?: string;
  filters: FilterInput[];
  sort?: SortOrderInput;
  pagination?: PaginationInput;
};

export type SearchContextType = {
  state: SearchState;
  setFilter(name: string, value: string[], operator?: FilterOperator): void;
  removeFilter(name: string): void;
  removeFilters(): void;
  setSortOrder(sort?: SortOrderInput): void;
  setTerm(term: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
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
