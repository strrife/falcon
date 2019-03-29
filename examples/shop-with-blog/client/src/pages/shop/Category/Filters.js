import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Button } from '@deity/falcon-ui';
import {
  FiltersLayout,
  FilterTile,
  SingleFilter,
  ColorFilter,
  MultipleFilter,
  SearchConsumer
} from '@deity/falcon-ecommerce-uikit';

export const Filters = ({ data, ...rest }) => (
  <SearchConsumer>
    {({ state: { filters }, setFilter, removeFilters }) => (
      <FiltersLayout {...rest}>
        {filters.length > 0 && (
          <Button onClick={removeFilters}>
            <T id="filters.clearAll" />
          </Button>
        )}
        {data.map(({ field, title, options, value }) => (
          <FilterTile key={field} title={title} initiallyOpen={value.length > 0}>
            {(() => {
              switch (field) {
                case 'price':
                  return (
                    <SingleFilter
                      options={options}
                      selected={value.join('-')}
                      onChange={x => setFilter(field, x ? x.split('-').slice(0, 2) : [], 'eq')}
                    />
                  );
                case 'color':
                  return (
                    <ColorFilter
                      options={options}
                      selected={value[0]}
                      onChange={x => setFilter(field, x ? [x] : [], 'eq')}
                    />
                  );
                case 'material':
                  return (
                    <MultipleFilter options={options} selected={value} onChange={x => setFilter(field, x, 'eq')} />
                  );
                case 'cat':
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
  </SearchConsumer>
);
