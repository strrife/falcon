export type FilterInput = {
  field: string;
  operator: FilterOperator;
  value: string[];
};

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
