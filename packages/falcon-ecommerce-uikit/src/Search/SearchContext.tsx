import React from 'react';
import { PaginationInput } from './../types';
import { FilterOperator, FilterInput } from './types';
import { SortOrder, SortOrderInput } from '../SortOrders/SortOrdersQuery';

export type SearchState = {
  term?: string;
  filters: FilterInput[];
  sort?: SortOrderInput;
  pagination?: PaginationInput;
};

export type SearchContextType = {
  state: SearchState;
  availableSortOrders: SortOrder[];
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
  availableSortOrders: [],
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  removeFilters: () => {},
  setSortOrder: () => {},
  setPagination: () => {}
});

export const SearchConsumer = SearchContext.Consumer;
