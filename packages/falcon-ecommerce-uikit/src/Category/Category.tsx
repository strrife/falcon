import React from 'react';
import { NetworkStatus } from 'apollo-client';
import { themed, H1, Divider, Box, FlexLayout } from '@deity/falcon-ui';
import { SortOrderDropdown } from './SortOrderDropdown';
import { ShowingOutOf } from './ShowingOutOf';
import { ShowMore } from './ShowMore';
import { toGridTemplate } from '../helpers';
import { ProductsList } from '../ProductsList/ProductsList';
import { Filters, getFiltersData } from '../Filters';

export const CategoryArea = {
  navigation: 'navigation',
  heading: 'heading',
  content: 'content'
};

export const CategoryLayout = themed({
  tag: 'div',

  defaultTheme: {
    productsCategory: {
      display: 'grid',
      gridGap: 'md',
      my: 'lg',
      // prettier-ignore
      gridTemplate: {
        xs: toGridTemplate([
          ['1fr'               ],
          [CategoryArea.heading],
          [CategoryArea.content]
        ]),
        md: toGridTemplate([
          ['1fr',                   '3fr'               ],
          [CategoryArea.heading,    CategoryArea.heading],
          [CategoryArea.navigation, CategoryArea.content]
        ]),
        lg: toGridTemplate([
          ['1fr',                   '4fr'               ],
          [CategoryArea.heading,    CategoryArea.heading],
          [CategoryArea.navigation, CategoryArea.content]
        ])
      }
    }
  }
});

type SortOrder = {
  name: string;
  field: string;
  direction: string;
};

export const Category: React.SFC<{
  category: { name: string; products: any };
  availableSortOrders: SortOrder[];
  activeSortOrder: SortOrder;
  setSortOrder(order: SortOrder): null;
  fetchMore: any;
  aggregations: any;
  networkStatus: NetworkStatus;
}> = ({ category, availableSortOrders, activeSortOrder, setSortOrder, fetchMore, networkStatus }) => {
  const { products } = category;
  const { pagination, items, aggregations } = products;

  return (
    <CategoryLayout>
      <Box gridArea={CategoryArea.heading}>
        <H1>{category.name}</H1>
        <FlexLayout justifyContent="space-between" alignItems="center">
          <ShowingOutOf itemsCount={items.length} totalItems={pagination.totalItems} />
          <SortOrderDropdown
            sortOrders={availableSortOrders}
            activeSortOrder={activeSortOrder}
            onChange={x => setSortOrder(x as SortOrder)}
          />
        </FlexLayout>
        <Divider mt="xs" />
      </Box>
      <Box gridArea={CategoryArea.navigation}>
        <Filters data={getFiltersData(aggregations)} />
      </Box>
      <Box gridArea={CategoryArea.content}>
        <ProductsList products={items} />
        {pagination.nextPage && <Divider />}
        {pagination.nextPage && <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />}
      </Box>
    </CategoryLayout>
  );
};
