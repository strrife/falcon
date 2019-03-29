import React from 'react';
import PropTypes from 'prop-types';
import { NetworkStatus } from 'apollo-client';
import { Toggle } from 'react-powerplug';
import { H1, H3, GridLayout, Box, FlexLayout, Divider, Button } from '@deity/falcon-ui';
import {
  SearchConsumer,
  CategoryProductsQuery,
  CategoryLayout,
  CategoryArea,
  ShowingOutOf,
  SortOrdersProvider,
  SortOrderDropdown,
  getFiltersData,
  FiltersSummary,
  ProductsList,
  ShowMore,
  Responsive,
  Sidebar
} from '@deity/falcon-ecommerce-uikit';
import { Filters } from './Filters';

const copy = item => item && JSON.parse(JSON.stringify(item));

const CategoryPage = ({ id }) => (
  <SearchConsumer>
    {({ state }) => (
      <CategoryProductsQuery
        variables={{
          categoryId: id,
          sort: {
            direction: state.sort.direction,
            field: state.sort.field
          },
          filters: copy(state.filters)
        }}
      >
        {({ category, fetchMore, networkStatus }) => {
          const { products } = category;
          const { pagination, items, aggregations } = products;
          const filtersData = getFiltersData(aggregations);

          return (
            <CategoryLayout>
              <Box gridArea={CategoryArea.heading}>
                <H1>{category.name}</H1>
                <FlexLayout justifyContent="space-between" alignItems="center">
                  <ShowingOutOf itemsCount={items.length} totalItems={pagination.totalItems} />
                  <SortOrdersProvider>
                    {sortOrdersProps => <SortOrderDropdown {...sortOrdersProps} />}
                  </SortOrdersProvider>
                </FlexLayout>
                <Divider mt="xs" />
              </Box>
              <Box gridArea={CategoryArea.filters}>
                <Responsive width="md">
                  {matches =>
                    matches ? (
                      <Filters aggregations={aggregations} />
                    ) : (
                      <Toggle initial={false}>
                        {({ on, toggle }) => (
                          <React.Fragment>
                            <Button onClick={toggle}>Filters</Button>
                            <Sidebar isOpen={on} side="left" close={toggle}>
                              <GridLayout gridRowGap="md">
                                <H3 ml="xl">Filters</H3>
                                <Filters aggregations={aggregations} px="md" />
                              </GridLayout>
                            </Sidebar>
                          </React.Fragment>
                        )}
                      </Toggle>
                    )
                  }
                </Responsive>
              </Box>
              <Box gridArea={CategoryArea.content}>
                <FiltersSummary data={filtersData} />
                <ProductsList products={items} />
              </Box>
              <Box gridArea={CategoryArea.footer}>
                {pagination.nextPage && <Divider />}
                {pagination.nextPage && (
                  <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />
                )}
              </Box>
            </CategoryLayout>
          );
        }}
      </CategoryProductsQuery>
    )}
  </SearchConsumer>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
