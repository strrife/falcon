import { PaginationInput } from './../types';

export type SortOrderDirection = 'asc' | 'desc';

export type FilterOperator = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'nin' | 'range';

export type SortOrder = {
  field: string;
  direction: SortOrderDirection;
  name: string;
};

export type FilterInput = {
  operator: FilterOperator;
  field: string;
  value: string[];
};

export type SearchState = {
  term?: string;
  filters: FilterInput[];
  sort: SortOrder;
  pagination?: PaginationInput;
};

export type Aggregation = {
  field: string;
  type: SelectionType;
  buckets: AggregationBucket[];
  title: string;
};

export type SelectionType = 'single' | 'multiple' | 'range';

export type AggregationBucket = {
  value: string;
  count: number;
  title: string;
};

export type FilterData = {
  field: string;
  title: string;
  type: SelectionType;
  operator: FilterOperator;
  options: FilterOption[];
};

export type FilterOption = {
  title: string;
  value: string;
  count: number;
};
