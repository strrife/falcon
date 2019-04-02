import { PaginationInput } from './../types';
import { SortOrderInput } from './../Category/SortOrdersQuery';

const FilterOperatorValues = {
  eq: 'eq',
  neq: 'neq',
  lt: 'lt',
  lte: 'lte',
  gt: 'gt',
  gte: 'gte',
  in: 'in',
  nin: 'nin',
  range: 'range'
};
export type FilterOperator = keyof typeof FilterOperatorValues;
type FilterOperatorsType = Record<FilterOperator, FilterOperator>;
export const FilterOperators: FilterOperatorsType = Object.freeze<FilterOperatorsType>({
  ...(FilterOperatorValues as FilterOperatorsType)
});

export type FilterInput = {
  field: string;
  operator: FilterOperator;
  value: string[];
};

export type SearchState = {
  term?: string;
  filters: FilterInput[];
  sort: SortOrderInput;
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
  options: FilterOption[];
  value: string[];
};

export type FilterOption = {
  title: string;
  value: string;
  count: number;
};
