import React from 'react';
import { Box, List } from '@deity/falcon-ui';
import { FilterInput, Aggregation } from '../Search/types';
import { FilterItemValue } from './FilterItemValue';

const filterContentTheme = {
  filterContent: {}
};

type FilterContentProps = {
  setFilter: (name: string, value: string[], operator?: string) => void;
  removeFilter: (name: string) => void;
  selected?: FilterInput;
  aggregation: Aggregation;
  singleMode?: boolean;
};

export const FilterContent: React.SFC<FilterContentProps> = ({ aggregation, selected, setFilter, singleMode }) => {
  const updateNormalFilter = (value: string) => {
    if (singleMode) {
      return setFilter(aggregation.field, [value]);
    }

    const nextSelected = selected ? [...selected.value] : [];
    if (!nextSelected.includes(value)) {
      nextSelected.push(value);
    }

    setFilter(aggregation.field, nextSelected);
  };

  const updatePriceFilter = (value: string) => {
    const [from, to] = value.split('-');
    setFilter(aggregation.field, [from, to], 'range');
  };

  const updateFilter = aggregation.field === 'price' ? updatePriceFilter : updateNormalFilter;

  return (
    <Box defaultTheme={filterContentTheme}>
      <List>
        {aggregation.buckets.map(item => (
          <FilterItemValue key={item.title} item={item} onClick={() => updateFilter(item.value)} />
        ))}
      </List>
    </Box>
  );
};
