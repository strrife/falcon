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
  // todo: price filter requires dedicated logic
  <SearchConsumer>
    {search => (
      <Box defaultTheme={filtersPanelTheme}>
        {!!title && <H2>{title}</H2>}
        {search.state.filters && search.state.filters.length > 0 && (
          <FiltersSummary selected={search.state.filters || []} removeFilter={search.removeFilter} />
        )}
        {aggregations
          .sort((first, second) => (first.name < second.name ? -1 : 1))
          .map(item => (
            <FilterTile key={item.key} title={item.name}>
              <FilterContent
                singleMode={item.key === 'cat'}
                aggregation={item}
                selected={getSelectedFilterValues(item.key, search.state.filters || [])}
                setFilter={search.setFilter}
                removeFilter={search.removeFilter}
              />
            </FilterTile>
          ))}
      </Box>
    )}
  </SearchConsumer>
);
