import React from 'react';
import { SortOrder } from './Category/SortOrdersQuery';
import { SearchConsumer } from './Search';

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
    {({ state, availableSortOrders, setSortOrder }) =>
      children({
        value: state.sort,
        items: availableSortOrders,
        onChange: setSortOrder
      })
    }
  </SearchConsumer>
);
