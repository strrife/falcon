export type RangeFilterProps = {
  min: number;
  max: number;
  selected: { from: number; to: number };
  setFilter: (from: string, to: string) => void;
};
