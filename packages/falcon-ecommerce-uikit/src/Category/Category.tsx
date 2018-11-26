import React, { MouseEventHandler } from 'react';
import { NetworkStatus } from 'apollo-client';
import { NamespacesConsumer } from 'react-i18next-with-context';
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
import { ProductsList } from '../ProductsList/ProductsList';

const CategoryLayout = themed({
  tag: 'div',

  defaultTheme: {
    productsCategory: {
      display: 'grid',
      gridGap: 'md',
      my: 'lg',
      css: {
        textAlign: 'center'
      }
    }
  }
});

export const Category: React.SFC<{
  category: { name: string };
  products: any;
  sortOrders: any[];
  fetchMore: any;
  networkStatus: NetworkStatus;
}> = ({ category, products, sortOrders, fetchMore, networkStatus }) => {
  const { pagination, items } = products;

  return (
    <CategoryLayout>
      <H1>{category.name}</H1>
      <FlexLayout justifyContent="space-between" alignItems="center">
        <ShowingOutOf itemsCount={items.length} totalItems={pagination.totalItems} />
        <SortOrderDropdown sortOrders={sortOrders} />
      </FlexLayout>
      <Divider />
      <ProductsList products={items} />
      {pagination.nextPage && <Divider />}
      {pagination.nextPage && <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />}
    </CategoryLayout>
  );
};

export const ShowingOutOf: React.SFC<{ itemsCount: number; totalItems: number }> = ({ itemsCount, totalItems }) => (
  <NamespacesConsumer ns="shop">
    {t => <Text>{t('productsList.pagination.showingOutOf', { itemsCount, totalItems })}</Text>}
  </NamespacesConsumer>
);

export const SortOrderDropdown: React.SFC<any> = ({ sortOrders, onChange }) => {
  const activeSortOrder = sortOrders.filter((sortOrder: any) => sortOrder.active)[0];

  return (
    <NamespacesConsumer ns="shop">
      {t => (
        <FlexLayout alignItems="center">
          <Text mr="sm">{t('productsList.sort.title')}</Text>
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
      )}
    </NamespacesConsumer>
  );
};

export const ShowMore: React.SFC<{ onClick: MouseEventHandler; loading: boolean }> = ({ onClick, loading }) => (
  <Box>
    <Button onClick={onClick} variant={loading ? 'loader' : 'secondary'} height="xl" my="sm">
      <NamespacesConsumer ns="shop">{t => t('productsList.pagination.showMore')}</NamespacesConsumer>
    </Button>
  </Box>
);
