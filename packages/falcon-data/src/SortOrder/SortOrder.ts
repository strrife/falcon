export type SortOrder = {
  name: string;
  value?: SortOrderInput;
};

export type SortOrderInput = {
  field: string;
  direction: SortOrderDirection;
};

export type SortOrderDirection = 'asc' | 'desc';
