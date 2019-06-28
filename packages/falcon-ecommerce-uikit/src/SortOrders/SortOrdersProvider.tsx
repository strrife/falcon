import React from 'react';
import { SortOrderListQuery, SortOrder } from '@deity/falcon-data';
import { SearchConsumer, areSortOrderInputsEqual } from '@deity/falcon-front-kit';

type SortOrdersProviderRenderProps = {
  items: SortOrder[];
  value: SortOrder;
  onChange(active: SortOrder): void;
};

type SortOrdersProviderProps = {
  children(props: SortOrdersProviderRenderProps): any;
};

export const SortOrdersProvider: React.SFC<SortOrdersProviderProps> = ({ children }) => (
  <SortOrderListQuery>
    {({ sortOrderList }) => (
      <SearchConsumer>
        {({ state: { sort }, setSortOrder }) =>
          children({
            items: sortOrderList,
            value: sortOrderList.find(x => (!x.value && !sort) || areSortOrderInputsEqual(x.value, sort))!,
            onChange: x => setSortOrder(x.value)
          })
        }
      </SearchConsumer>
    )}
  </SortOrderListQuery>
);
