import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator, FilterInput } from '../Search';

export const aggregationToFilterData = (aggregation: Aggregation): FilterData => ({
  field: aggregation.field,
  title: aggregation.title,
  type: aggregation.type,
  options: aggregation.buckets,
  value: []
});

export const getFiltersData = (
  filters: FilterInput[],
  aggregations: Aggregation[] = [],
  filterData: FilterData[] = []
): FilterData[] =>
  [...[], ...aggregations.map(x => aggregationToFilterData(x)), ...filterData]
    .map(x => {
      const selected = filters.find(filter => filter.field === x.field);

      return {
        ...x,
        value: selected ? selected.value : []
      };
    })
    .sort((first, second) => (first.title < second.title ? -1 : 1));

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

export type FilterDataProviderRenderProps = {
  filters: FilterData[];
  anySelected: boolean;
  setFilter(name: string, value: string[], operator?: FilterOperator): void;
  removeFilters(): void;
};

export const FiltersDataProvider: React.SFC<{
  aggregations?: Aggregation[];
  data?: FilterData[];
  children: (renderProps: FilterDataProviderRenderProps) => React.ReactNode;
}> = ({ children, aggregations, data }) => (
  <SearchConsumer>
    {({ state: { filters }, setFilter, removeFilters }) =>
      children({
        filters: getFiltersData(filters, aggregations || [], data || []),
        anySelected: filters.length > 0,
        setFilter,
        removeFilters
      })
    }
  </SearchConsumer>
);
