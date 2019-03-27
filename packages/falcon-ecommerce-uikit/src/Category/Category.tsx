import React from 'react';
import { NetworkStatus } from 'apollo-client';
import MediaQuery from 'react-responsive';
import { Toggle } from 'react-powerplug';
import { themed, H1, Divider, Box, FlexLayout, Button, Sidebar, Backdrop, Portal } from '@deity/falcon-ui';
import { SortOrderDropdown } from './SortOrderDropdown';
import { ShowingOutOf } from './ShowingOutOf';
import { ShowMore } from './ShowMore';
import { toGridTemplate } from '../helpers';
import { ProductsList } from '../ProductsList/ProductsList';
import { Filters, FiltersSummary, getFiltersData } from '../Filters';
import { SortOrdersProvider } from '../SortOrdersProvider';

export const CategoryArea = {
  heading: 'heading',
  filters: 'filters',
  content: 'content',
  footer: 'footer'
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
          [CategoryArea.filters],
          [CategoryArea.content],
          [CategoryArea.footer ]
        ]),
        md: toGridTemplate([
          ['1fr',                   '3fr'               ],
          [CategoryArea.heading,    CategoryArea.heading],
          [CategoryArea.filters,    CategoryArea.content],
          [CategoryArea.footer,     CategoryArea.footer ]
        ]),
        lg: toGridTemplate([
          ['1fr',                   '4fr'               ],
          [CategoryArea.heading,    CategoryArea.heading],
          [CategoryArea.filters,    CategoryArea.content],
          [CategoryArea.footer,     CategoryArea.footer ]
        ])
      }
    }
  }
});

export const Category: React.SFC<{
  category: { name: string; products: any };
  fetchMore: any;
  aggregations: any;
  networkStatus: NetworkStatus;
}> = ({ category, fetchMore, networkStatus }) => {
  const { products } = category;
  const { pagination, items, aggregations } = products;
  const filtersData = getFiltersData(aggregations);

  return (
    <CategoryLayout>
      <Box gridArea={CategoryArea.heading}>
        <H1>{category.name}</H1>
        <FlexLayout justifyContent="space-between" alignItems="center">
          <ShowingOutOf itemsCount={items.length} totalItems={pagination.totalItems} />
          <SortOrdersProvider>{sortOrdersProps => <SortOrderDropdown {...sortOrdersProps} />}</SortOrdersProvider>
        </FlexLayout>
        <Divider mt="xs" />
      </Box>
      <Box gridArea={CategoryArea.filters}>
        <MediaQuery minWidth={860}>
          {(matches: boolean) =>
            matches ? (
              <Filters data={filtersData} />
            ) : (
              <Toggle initial={false}>
                {({ on, toggle }: any) => (
                  <React.Fragment>
                    <Button onClick={toggle}>Filters</Button>
                    <Sidebar as={Portal} visible={on}>
                      <Filters data={filtersData} />
                    </Sidebar>
                    <Backdrop onClick={toggle} as={Portal} visible={on} />
                  </React.Fragment>
                )}
              </Toggle>
            )
          }
        </MediaQuery>
      </Box>
      <Box gridArea={CategoryArea.content}>
        <FiltersSummary data={filtersData} />
        <ProductsList products={items} />
      </Box>
      <Box gridArea={CategoryArea.footer}>
        {pagination.nextPage && <Divider />}
        {pagination.nextPage && <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />}
      </Box>
    </CategoryLayout>
  );
};
