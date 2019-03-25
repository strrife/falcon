import React from 'react';
import { Box, Button, H3 } from '@deity/falcon-ui';
import { SearchConsumer } from '../Search';
import { FilterInput, Aggregation } from '../Search/types';
import { FilterTile, FilterLayout } from './FilterTile';
import { FilterContent, SingleFilter } from './FilterContent';
import { FiltersSummary } from './FiltersSummary';

const filtersPanelTheme = {
  filtersPanel: {}
};

type FilterPanelProps = {
  aggregations: Aggregation[];
};

export const FiltersPanel: React.SFC<FilterPanelProps> = ({ aggregations }) => (
  <SearchConsumer>
    {({ setFilter, removeFilter, removeAllFilters, state: { filters } }) => {
      const anyFilters = filters.length > 0;
      // const a = 1;
      // const selectedAggregations = aggregations.filter(x => filters.some(filter => filter.field === x.field));

      return (
        <Box defaultTheme={filtersPanelTheme}>
          {anyFilters && <Button onClick={removeAllFilters}>Clear all filters</Button>}
          {anyFilters && <FiltersSummary selected={filters} removeFilter={removeFilter} />}
          {aggregations
            .sort((first, second) => (first.title < second.title ? -1 : 1))
            .map(item => {
              const selectedFilter = filters.find(x => x.field === item.field);

              if (item.field === 'color') {
                return (
                  <FilterLayout key={item.field}>
                    <H3>{item.title}</H3>
                    <SingleFilter
                      field={item.field}
                      options={item.buckets}
                      selected={selectedFilter ? selectedFilter.value[0] : undefined}
                      setFilter={setFilter}
                      removeFilter={removeFilter}
                    />
                  </FilterLayout>
                );
              }

              return (
                <FilterLayout key={item.field}>
                  <H3>{item.title}</H3>
                  <FilterContent
                    singleMode={item.field === 'cat'}
                    aggregation={item}
                    selected={selectedFilter ? selectedFilter.value : []}
                    setFilter={setFilter}
                    removeFilter={removeFilter}
                  />
                </FilterLayout>
              );
            })}
        </Box>
      );
    }}
  </SearchConsumer>
);
