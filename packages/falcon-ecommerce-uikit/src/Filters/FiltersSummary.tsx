import React from 'react';
import { Box, List, ListItem, themed } from '@deity/falcon-ui';
import { SearchConsumer, FilterData, FilterInput } from '../Search';
import { SelectedFilterItem } from './FilterItem';

export const FiltersSummaryLayout = themed({
  tag: Box,
  defaultTheme: {
    filtersSummaryLayout: {}
  }
});

type FiltersSummaryProps = {
  data: FilterData[];
};

export const getSelectedFilterData = (data: FilterData[], filters: FilterInput[]): FilterData[] =>
  filters
    .reduce<FilterData[]>((result, { value, field }) => {
      const filterData = data.find(item => item.field === field);

      return filterData
        ? [
            ...result,
            {
              ...filterData,
              options: filterData.options.filter(item => value.some(x => x === item.value))
            }
          ]
        : result;
    }, [])
    .sort((first, second) => (first.title < second.title ? -1 : 1));

export const FiltersSummary: React.SFC<FiltersSummaryProps> = ({ data }) => (
  <SearchConsumer>
    {({ state: { filters }, removeFilter }) => {
      const anyFilters = filters.length > 0;
      if (anyFilters === false) {
        return null;
      }

      const selected = getSelectedFilterData(data, filters);

      return (
        <FiltersSummaryLayout>
          <List>
            {selected.map(item => (
              <SelectedFilterItem key={item.field} onClick={() => removeFilter(item.field)}>
                {item.title}: {item.options.map(x => x.title || x.value).join(', ')}
              </SelectedFilterItem>
            ))}
          </List>
        </FiltersSummaryLayout>
      );
    }}
  </SearchConsumer>
);
