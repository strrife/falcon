import React from 'react';
import { PaginationInput } from './../types';
import { SearchState, FilterOperator } from './types';
import { SortOrder, SortOrderInput } from '../SortOrders/SortOrdersQuery';

export type SearchContextType = {
  state: SearchState;
  availableSortOrders: SortOrder[];
  setFilter(name: string, value: string[], operator?: FilterOperator): void;
  removeFilter(name: string): void;
  removeFilters(): void;
  setSortOrder(sort: SortOrderInput): void;
  setTerm(term: string): void;
  setPagination(pagination: PaginationInput): void;
};

export const SearchContext = React.createContext<SearchContextType>({
  state: { filters: [] } as any,
  availableSortOrders: [],
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  removeFilters: () => {},
  setSortOrder: () => {},
  setPagination: () => {}
});

export const SearchConsumer = SearchContext.Consumer;
