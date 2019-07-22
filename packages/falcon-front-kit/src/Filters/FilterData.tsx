import { SelectionType } from '@deity/falcon-data';

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
