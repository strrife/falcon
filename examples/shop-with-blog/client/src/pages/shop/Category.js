import React from 'react';
import PropTypes from 'prop-types';
import { SearchContext, CategoryProductsQuery, Category } from '@deity/falcon-ecommerce-uikit';

const CategoryPage = ({ id }) => (
  <SearchContext.Consumer>
    {({ state, availableSortOrders, setSortOrder }) => (
      <CategoryProductsQuery
        variables={{
          categoryId: id,
          sort: {
            direction: state.sort.direction,
            field: state.sort.field
          },
          filters: state.filters
        }}
      >
        {categoryProps => (
          <Category
            {...categoryProps}
            availableSortOrders={availableSortOrders}
            activeSortOrder={state.sort}
            setSortOrder={setSortOrder}
          />
        )}
      </CategoryProductsQuery>
    )}
  </SearchContext.Consumer>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
