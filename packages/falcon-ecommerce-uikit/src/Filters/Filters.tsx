import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, Button, themed, ThemedComponentProps } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator } from '../Search';
import { FilterTile } from './FilterTile';
import { SingleFilter, ColorFilter } from './FilterContent';

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
          {data.map(({ field, title, options }) => {
            const filter = filters.find(x => x.field === field);
            const selectedValue = filter ? filter.value : [];

            return (
              <FilterTile key={field} title={title} initiallyOpen={selectedValue.length > 0}>
                {(() => {
                  switch (field) {
                    case 'cat':
                      return (
                        <SingleFilter
                          options={options}
                          selected={selectedValue[0]}
                          onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                        />
                      );
                    case 'price':
                      return null;
                    case 'color':
                      return (
                        <ColorFilter
                          options={options}
                          selected={selectedValue[0]}
                          onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                        />
                      );
                    default:
                      return (
                        <SingleFilter
                          options={options}
                          selected={selectedValue[0]}
                          onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                        />
                      );
                  }
                })()}
              </FilterTile>
            );
          })}
        </FiltersLayout>
      );
    }}
  </SearchConsumer>
);
