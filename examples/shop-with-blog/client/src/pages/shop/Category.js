import React from 'react';
import PropTypes from 'prop-types';
import { NetworkStatus } from 'apollo-client';
import { H1, Box, FlexLayout, Divider } from '@deity/falcon-ui';
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
  ShowMore
} from '@deity/falcon-ecommerce-uikit';

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
            // <Category {...categoryProps} />
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
                {/* <MediaQuery minWidth={860}>
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
                </MediaQuery> */}
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
