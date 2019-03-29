import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, Button, themed, ThemedComponentProps } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator } from '../Search';
import { FilterTile } from './FilterTile';
import { FilterContent, SingleFilter } from './FilterContent';

export const aggregationToFilterData = (aggregation: Aggregation, operator: FilterOperator = 'eq'): FilterData => ({
  field: aggregation.field,
  title: aggregation.title,
  type: aggregation.type,
  operator,
  options: aggregation.buckets
});

export const aggregationsToFiltersData = (aggregations: Aggregation[] = []) =>
  aggregations.map(x => aggregationToFilterData(x));

export const getFiltersData = (aggregations: Aggregation[], mergeWith: FilterData[] = []): FilterData[] =>
  [...[], ...aggregationsToFiltersData(aggregations), ...mergeWith].sort((first, second) =>
    first.title < second.title ? -1 : 1
  );

export const FiltersLayout = themed({
  tag: Box,
  defaultTheme: {
    filtersPanelLayout: {
      display: 'grid',
      gridGap: 'sm',
      css: {
        width: '100%',
        alignContent: 'start'
      }
    }
  }
});

export const Filters: React.SFC<{ data: FilterData[] } & ThemedComponentProps> = ({ data, ...rest }) => (
  <SearchConsumer>
    {({ setFilter, removeAllFilters, state: { filters } }) => {
      const anyFilters = filters.length > 0;

      return (
        <FiltersLayout {...rest as any}>
          {anyFilters && (
            <Button onClick={removeAllFilters}>
              <T id="filters.clearAll" />
            </Button>
          )}
          {data.map(item => {
            const filter = filters.find(x => x.field === item.field);
            const selectedValue = filter ? filter.value : [];

            return (
              <FilterTile key={item.field} title={item.title} initiallyOpen={selectedValue.length > 0}>
                {item.field === 'color' ? (
                  <SingleFilter
                    field={item.field}
                    options={item.options}
                    selected={selectedValue[0]}
                    setFilter={setFilter}
                    display="flex"
                    flexWrap="wrap"
                  />
                ) : (
                  <FilterContent
                    singleMode={item.field === 'cat'}
                    aggregation={item}
                    selected={selectedValue}
                    setFilter={setFilter}
                  />
                )}
              </FilterTile>
            );
          })}
        </FiltersLayout>
      );
    }}
  </SearchConsumer>
);
