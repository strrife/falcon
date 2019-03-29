import { PaginationInput } from './../types';
import { SortOrder } from './../Category/SortOrdersQuery';

export type FilterOperator = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'nin' | 'range';

export type FilterInput = {
  field: string;
  operator: FilterOperator;
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
  value: string[];
};

export type FilterOption = {
  title: string;
  value: string;
  count: number;
};
