import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, Button, themed, ThemedComponentProps } from '@deity/falcon-ui';
import { SearchConsumer, Aggregation, FilterData, FilterOperator, FilterInput } from '../Search';
import { FilterTile } from './FilterTile';
import { SingleFilter, ColorFilter } from './FilterContent';

export const aggregationToFilterData = (aggregation: Aggregation, operator: FilterOperator = 'eq'): FilterData => ({
  field: aggregation.field,
  title: aggregation.title,
  type: aggregation.type,
  operator,
  options: aggregation.buckets,
  value: []
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
}> = ({ children, aggregations, data }) => {
  const getSelectedFilter = (filters: FilterInput[] /* FilterData[] */, name: string) =>
    filters.find(x => x.field === name);
  const getSelectedFilterValue = (filters: FilterInput[] /* FilterData[] */, name: string) => {
    const selected = getSelectedFilter(filters, name);

    return selected ? selected.value : [];
  };

  return (
    <SearchConsumer>
      {({ state: { filters }, setFilter, removeFilters }) =>
        children({
          filters: getFiltersData(aggregations || [], data || []).map(x => ({
            ...x,
            value: getSelectedFilterValue(filters, x.field)
          })),
          anySelected: filters.length > 0,
          setFilter,
          removeFilters
        })
      }
    </SearchConsumer>
  );
};

export const Filters: React.SFC<{ aggregations: Aggregation[]; data: FilterData[] } & ThemedComponentProps> = ({
  data,
  aggregations,
  ...rest
}) => (
  <FiltersDataProvider aggregations={aggregations}>
    {({ filters, anySelected, setFilter, removeFilters }) => (
      <FiltersLayout {...rest as any}>
        {anySelected && (
          <Button onClick={removeFilters}>
            <T id="filters.clearAll" />
          </Button>
        )}
        {filters.map(({ field, title, options, value }) => (
          <FilterTile key={field} title={title} initiallyOpen={value.length > 0}>
            {(() => {
              switch (field) {
                case 'cat':
                  return (
                    <SingleFilter
                      options={options}
                      selected={value[0]}
                      onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                    />
                  );
                case 'price':
                  return null;
                case 'color':
                  return (
                    <ColorFilter
                      options={options}
                      selected={value[0]}
                      onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                    />
                  );
                default:
                  return (
                    <SingleFilter
                      options={options}
                      selected={value[0]}
                      onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                    />
                  );
              }
            })()}
          </FilterTile>
        ))}
      </FiltersLayout>
    )}
  </FiltersDataProvider>
);
