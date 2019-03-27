import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, Button, H3, DetailsContent, themed } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator } from '../Search';
import { FilterDetails, FilterSummary } from './FilterTile';
import { FilterContent, SingleFilter } from './FilterContent';

export const aggregationToFilterData = (aggregation: Aggregation, operator: FilterOperator = 'eq'): FilterData => ({
  field: aggregation.field,
  title: aggregation.title,
  type: aggregation.type,
  operator,
  options: aggregation.buckets
});

export const getFiltersData = (aggregations: Aggregation[], mergeWith: FilterData[] = []): FilterData[] =>
  [...[], ...aggregations.map(x => aggregationToFilterData(x)), ...mergeWith].sort((first, second) =>
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

export const Filters: React.SFC<{ data: FilterData[] }> = ({ data, ...rest }) => (
  <SearchConsumer>
    {({ setFilter, removeFilter, removeAllFilters, state: { filters } }) => {
      const anyFilters = filters.length > 0;

      return (
        <FiltersLayout {...rest}>
          {anyFilters && (
            <Button onClick={removeAllFilters}>
              <T id="filters.clearAll" />
            </Button>
          )}
          {data.map(item => {
            const filter = filters.find(x => x.field === item.field);
            const selectedValue = filter ? filter.value : [];

            return (
              <FilterDetails key={item.field} initiallyOpen={selectedValue.length > 0}>
                {({ toggle }) => (
                  <React.Fragment>
                    <FilterSummary onClick={toggle}>
                      <H3>{item.title}</H3>
                    </FilterSummary>
                    <DetailsContent>
                      {item.field === 'color' ? (
                        <SingleFilter
                          field={item.field}
                          options={item.options}
                          selected={selectedValue[0]}
                          setFilter={setFilter}
                          removeFilter={removeFilter}
                        />
                      ) : (
                        <FilterContent
                          singleMode={item.field === 'cat'}
                          aggregation={item}
                          selected={selectedValue}
                          setFilter={setFilter}
                          removeFilter={removeFilter}
                        />
                      )}
                    </DetailsContent>
                  </React.Fragment>
                )}
              </FilterDetails>
            );
          })}
        </FiltersLayout>
      );
    }}
  </SearchConsumer>
);
