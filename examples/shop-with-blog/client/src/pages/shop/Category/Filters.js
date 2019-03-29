import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Button } from '@deity/falcon-ui';
import {
  FiltersDataProvider,
  FiltersLayout,
  FilterTile,
  SingleFilter,
  ColorFilter
} from '@deity/falcon-ecommerce-uikit';

export const Filters = ({ data, aggregations, ...rest }) => (
  <FiltersDataProvider aggregations={aggregations}>
    {({ filters, anySelected, setFilter, removeFilters }) => (
      <FiltersLayout {...rest}>
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
