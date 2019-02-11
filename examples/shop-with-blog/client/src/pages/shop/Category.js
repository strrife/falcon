import React from 'react';
import PropTypes from 'prop-types';
import { SearchContext, CategoryProductsQuery, Category } from '@deity/falcon-ecommerce-uikit';

const CategoryPage = ({ id }) => (
  <SearchContext.Consumer>
    {({ state, availableSortOrders, setSortOrder }) => {
      const activeSortOrder = state.sort || availableSortOrders[0];
      return (
        <CategoryProductsQuery
          variables={{
            categoryId: id,
            sort: {
              field: activeSortOrder.field,
              direction: activeSortOrder.direction
            },
            filters: state.filters
          }}
        >
          {categoryProps => (
            <Category
              {...categoryProps}
              availableSortOrders={availableSortOrders}
              activeSortOrder={activeSortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </CategoryProductsQuery>
      );
    }}
  </SearchContext.Consumer>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
