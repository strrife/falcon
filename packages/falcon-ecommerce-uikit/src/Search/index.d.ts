export enum SortOrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export enum FilterOperator {
  eq = 'eq',
  neq = 'neq',
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  in = 'in',
  nin = 'nin',
  range = 'range'
}

export type SortOrderInput = {
  field: string;
  direction: SortOrderDirection;
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
  query?: string;
  filters?: any[];
  sort?: SortOrderInput;
  pagination?: PaginationInput;
};
