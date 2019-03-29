import React from 'react';
import { Box, List, themed, ThemedComponentProps } from '@deity/falcon-ui';
import { FilterData, FilterOption, FilterOperator } from '../Search/types';
import { FilterItem, FilterItemLayout } from './FilterItem';
import { SelectedFilterItem } from './FilterItem';
import { ColorTile } from './ColorTile';

const filterContentTheme = {
  filterContent: {}
};

type FilterContentProps = {
  setFilter: (name: string, value: string[], operator?: FilterOperator) => void;
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

export const SingleFilter: React.SFC<
  {
    field: string;
    options: FilterOption[];
    selected?: string;
    setFilter: (name: string, value: string[], operator?: FilterOperator) => void;
  } & ThemedComponentProps
> = ({ field, options, selected, setFilter, ...rest }) => {
  const updateNormalFilter = (value?: string) => setFilter(field, value ? [value] : []);

  // const updatePriceFilter = (value: string) => {
  //   const [from, to] = value.split('-');
  //   setFilter(aggregation.field, [from, to], 'range');
  // };

  const updateFilter = updateNormalFilter;
  const selectedOption = selected ? options.find(x => x.value === selected) : undefined;

  return (
    <FilterItemsList {...rest as any}>
      {selected && (
        <SelectedFilterItem onClick={() => updateFilter()}>
          <ColorTile size="lg" color={selectedOption!.title} title={selectedOption!.title} />
        </SelectedFilterItem>
      )}
      {!selected &&
        options.map(x => (
          <FilterItemLayout key={x.title} onClick={() => updateFilter(x.value)}>
            <ColorTile size="lg" color={x!.title} title={x!.title} />
          </FilterItemLayout>
        ))}
    </FilterItemsList>
  );
};
