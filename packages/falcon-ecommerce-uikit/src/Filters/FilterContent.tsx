import React from 'react';
import { Box, List, themed } from '@deity/falcon-ui';
import { FilterData, FilterOption } from '../Search/types';
import { FilterItem, FilterItemLayout } from './FilterItem';
import { SelectedFilterItem } from './FilterItem';
import { ColorTile } from './ColorTile';

const filterContentTheme = {
  filterContent: {}
};

type FilterContentProps = {
  setFilter: (name: string, value: string[], operator?: string) => void;
  removeFilter: (name: string) => void;
  selected: string[];
  aggregation: FilterData;
  singleMode?: boolean;
};

export const FilterContent: React.SFC<FilterContentProps> = ({ aggregation, selected = [], setFilter, singleMode }) => {
  const updateNormalFilter = (value: string) => {
    if (singleMode) {
      return setFilter(aggregation.field, [value]);
    }

    const nextSelected = selected;
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
        {aggregation.options.map(item => (
          <FilterItem key={item.title} item={item} onClick={() => updateFilter(item.value)} />
        ))}
      </List>
    </Box>
  );
};

export const FilterItemsList = themed({
  tag: List,
  defaultTheme: {
    filterItemsList: {
      css: {
        listStyle: 'none'
      }
    }
  }
});

export const SingleFilter: React.SFC<{
  field: string;
  options: FilterOption[];
  selected?: string;
  setFilter: (field: string, value: string[], operator?: string) => void;
  removeFilter: (field: string) => void;
}> = ({ field, options, selected, setFilter, removeFilter }) => {
  const updateNormalFilter = (value: string) => setFilter(field, [value]);

  // const updatePriceFilter = (value: string) => {
  //   const [from, to] = value.split('-');
  //   setFilter(aggregation.field, [from, to], 'range');
  // };

  const updateFilter = updateNormalFilter;
  const selectedOption = selected ? options.find(x => x.value === selected) : undefined;

  return (
    <FilterItemsList display="flex" flexWrap="wrap">
      {selected && (
        <SelectedFilterItem onClick={() => removeFilter(field)}>
          <ColorTile size="lg" color={selectedOption!.title} title={selectedOption!.title} />
        </SelectedFilterItem>
      )}
      {!selected &&
        options.map(item => (
          <FilterItemLayout key={item.title} onClick={() => updateFilter(item.value)}>
            <ColorTile size="lg" color={item!.title} title={item!.title} />
          </FilterItemLayout>
        ))}
    </FilterItemsList>
  );
};
