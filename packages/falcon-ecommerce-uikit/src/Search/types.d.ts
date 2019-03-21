export type SortOrderDirection = 'asc' | 'desc';

export type FilterOperator = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'nin' | 'range';

export type SortOrder = {
  field: string;
  direction: SortOrderDirection;
  name?: string;
};

export type PaginationInput = {
  perPage: number;
  page: number;
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
  type: AggregationType;
  buckets: AggregationBucket[];
  title: string;
};

export type AggregationType = 'single' | 'multiple' | 'range';

export type AggregationBucket = {
  value: string;
  count: number;
  title: string;
};
