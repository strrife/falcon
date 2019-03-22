import React, { MouseEventHandler } from 'react';
import { NetworkStatus } from 'apollo-client';
import {
  themed,
  H1,
  Text,
  Divider,
  Button,
  Box,
  FlexLayout,
  Dropdown,
  DropdownLabel,
  DropdownMenu,
  DropdownMenuItem
} from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ProductsList } from '../ProductsList/ProductsList';
import { toGridTemplate } from '../helpers';
import { FiltersPanel } from '../Filters';
import { SearchConsumer } from '../Search';

const CategoryArea = {
  navigation: 'navigation',
  heading: 'heading',
  content: 'content'
};

const CategoryLayout = themed({
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
    <SearchConsumer>
      {search => (
        <CategoryLayout>
          <Box gridArea={CategoryArea.heading}>
            <H1>{category.name}</H1>
            <FlexLayout justifyContent="space-between" alignItems="center">
              <ShowingOutOf itemsCount={items.length} totalItems={pagination.totalItems} />
              <SortOrderDropdown
                sortOrders={availableSortOrders}
                activeSortOrder={activeSortOrder}
                onChange={setSortOrder}
              />
            </FlexLayout>
            <Divider mt="xs" />
          </Box>
          <Box gridArea={CategoryArea.navigation}>
            {((aggregations && aggregations.length !== 0) || search.state.filters.length > 0) && (
              <FiltersPanel aggregations={aggregations} />
            )}
          </Box>
          <Box gridArea={CategoryArea.content}>
            <ProductsList products={items} />
            {pagination.nextPage && <Divider />}
            {pagination.nextPage && (
              <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />
            )}
          </Box>
        </CategoryLayout>
      )}
    </SearchConsumer>
  );
};

export const ShowingOutOf: React.SFC<{ itemsCount: number; totalItems: number }> = ({ itemsCount, totalItems }) => (
  <Text>
    <T id="productsList.pagination.showingOutOf" {...{ itemsCount, totalItems }} />
  </Text>
);

export const SortOrderDropdown: React.SFC<any> = ({ sortOrders, activeSortOrder, onChange }) => (
  <FlexLayout alignItems="center">
    <Text mr="sm">
      <T id="productsList.sort.title" />
    </Text>
    <Box display="flex">
      <Dropdown css={{ width: '100%' }} onChange={onChange}>
        <DropdownLabel>{activeSortOrder.name}</DropdownLabel>
        <DropdownMenu>
          {sortOrders.map((sortOrder: any) => (
            <DropdownMenuItem key={sortOrder.name} value={sortOrder}>
              {sortOrder.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Box>
  </FlexLayout>
);

export const ShowMore: React.SFC<{ onClick: MouseEventHandler; loading: boolean }> = ({ onClick, loading }) => (
  <Box>
    <Button onClick={onClick} variant={loading ? 'loader' : 'secondary'} height="xl" my="sm">
      <T id="productsList.pagination.showMore" />
    </Button>
  </Box>
);
