import React from 'react';
import { SortOrder, AreSortOrderInputsEqual } from './SortOrdersQuery';
import { SearchConsumer } from '../Search';

type SortOrdersProviderRenderProps = {
  items: SortOrder[];
  value: SortOrder;
  onChange(active: SortOrder): void;
};

type SortOrdersProviderProps = {
  children(props: SortOrdersProviderRenderProps): any;
};

export const SortOrdersProvider: React.SFC<SortOrdersProviderProps> = ({ children }) => (
  <SearchConsumer>
    {({ state: { sort }, availableSortOrders, setSortOrder }) =>
      children({
        items: availableSortOrders,
        value: availableSortOrders.find(x => (!x.value && !sort) || AreSortOrderInputsEqual(x.value, sort))!,
        onChange: x => setSortOrder(x.value)
      })
    }
  </SearchConsumer>
);
