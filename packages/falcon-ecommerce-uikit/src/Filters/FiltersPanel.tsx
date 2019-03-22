import React from 'react';
import { Box, H2 } from '@deity/falcon-ui';
import { SearchConsumer } from '../Search';
import { FilterInput, Aggregation } from '../Search/types';
import { FilterTile } from './FilterTile';
import { FilterContent } from './FilterContent';
import { FiltersSummary } from './FiltersSummary';

const filtersPanelTheme = {
  filtersPanel: {}
};

const getSelectedFilterValues = (key: string, selectedFilters: FilterInput[]) =>
  selectedFilters.find(filter => filter.field === key);

type FilterPanelProps = {
  title?: string;
  aggregations: Aggregation[];
};

export const FiltersPanel: React.SFC<FilterPanelProps> = ({ title, aggregations }) => (
  <SearchConsumer>
    {({ setFilter, removeFilter, state: { filters } }) => (
      <Box defaultTheme={filtersPanelTheme}>
        {!!title && <H2>{title}</H2>}
        {filters.length > 0 && <FiltersSummary selected={filters} removeFilter={removeFilter} />}
        {aggregations
          .sort((first, second) => (first.title < second.title ? -1 : 1))
          .map(item => (
            <FilterTile key={item.field} title={item.title}>
              <FilterContent
                singleMode={item.field === 'cat'}
                aggregation={item}
                selected={getSelectedFilterValues(item.field, filters)}
                setFilter={setFilter}
                removeFilter={removeFilter}
              />
            </FilterTile>
          ))}
      </Box>
    )}
  </SearchConsumer>
);
