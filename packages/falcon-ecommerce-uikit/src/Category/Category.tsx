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
import { ProductsList } from '../Product/Products';

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

export const ShowingOutOf: React.SFC<{ itemsCount: number; totalItems: number }> = ({ itemsCount, totalItems }) => (
  <NamespacesConsumer ns="shop">
    {t => <Text>{t('category.pagination.showingOutOf', { itemsCount, totalItems })}</Text>}
  </NamespacesConsumer>
);

export const SortOrderDropdown: React.SFC<any> = ({ sortOrders, onChange }) => {
  const activeSortOrder = sortOrders.filter((sortOrder: any) => sortOrder.active)[0];

  return (
    <NamespacesConsumer ns="shop">
      {t => (
        <FlexLayout alignItems="center">
          <Text mr="sm">{t('category.sort.title')}</Text>
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
export const CategoryToolbar: React.SFC<{ itemsCount: number; totalItems: number; sortOrders: any }> = ({
  itemsCount,
  totalItems,
  sortOrders
}) => (
  <FlexLayout justifyContent="space-between" alignItems="center">
    <ShowingOutOf itemsCount={itemsCount} totalItems={totalItems} />
    <SortOrderDropdown sortOrders={sortOrders} />
  </FlexLayout>
);

export const ShowMore: React.SFC<{ text: string; onClick?: MouseEventHandler; loading: boolean }> = ({
  text,
  onClick,
  loading
}) => (
  <Box my="sm" onClick={onClick || (() => {})}>
    <Button variant={loading ? 'loader' : 'secondary'} height="xl">
      {text}
    </Button>
  </Box>
);

export const Category: React.SFC<{
  category: { name: string };
  products: any;
  sortOrders: any[];
  translations: any;
  fetchMore: any;
  networkStatus: NetworkStatus;
}> = ({ category, products, sortOrders, translations, fetchMore, networkStatus }) => {
  const { pagination, items } = products;

  return (
    <CategoryLayout>
      <H1>{category.name}</H1>
      <CategoryToolbar itemsCount={items.length} totalItems={pagination.totalItems} sortOrders={sortOrders} />
      <Divider />
      <ProductsList products={items} />

      {pagination.nextPage && (
        <React.Fragment>
          <Divider />
          <ShowMore
            text={translations.category.pagination.showMore}
            onClick={fetchMore}
            loading={networkStatus === NetworkStatus.fetchMore}
          />
        </React.Fragment>
      )}
    </CategoryLayout>
  );
};
