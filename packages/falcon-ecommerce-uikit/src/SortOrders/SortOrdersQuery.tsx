export type SortOrderDirection = 'asc' | 'desc';

export type SortOrderInput = {
  field: string;
  direction: SortOrderDirection;
};

export type SortOrder = {
  name: string;
  value?: SortOrderInput;
};

export type SortOrdersData = {
  sortOrders: SortOrder[];
};
