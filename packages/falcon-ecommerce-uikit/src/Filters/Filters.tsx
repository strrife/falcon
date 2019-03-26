import React from 'react';
import { Toggle } from 'react-powerplug';
import { T } from '@deity/falcon-i18n';
import { Box, Button, H3, Details, Summary, DetailsContent, themed } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator } from '../Search';
import { FilterLayout } from './FilterTile';
import { FilterContent, SingleFilter } from './FilterContent';
import { FiltersSummary } from './FiltersSummary';

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
        width: '100%'
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
          {anyFilters && <FiltersSummary data={data} />}
          {data.map(item => {
            const filter = filters.find(x => x.field === item.field);
            const selectedValue = filter ? filter.value : [];

            return (
              <FilterLayout key={item.field}>
                <Toggle initial={false}>
                  {({ on, toggle }) => (
                    <Details open={on || selectedValue.length > 0}>
                      <Summary
                        onClick={(e: any) => {
                          e.preventDefault();
                          toggle();
                        }}
                      >
                        <H3>{item.title}</H3>
                      </Summary>
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
                    </Details>
                  )}
                </Toggle>
              </FilterLayout>
            );
          })}
        </FiltersLayout>
      );
    }}
  </SearchConsumer>
);
