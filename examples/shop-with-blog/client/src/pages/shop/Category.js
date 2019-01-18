import React from 'react';
import PropTypes from 'prop-types';
import { SortOrdersProvider, CategoryProductsQuery, Category } from '@deity/falcon-ecommerce-uikit';

const CategoryPage = ({ id }) => (
  <SortOrdersProvider>
    {({ availableSortOrders, activeSortOrder, setSortOrder }) => (
      <CategoryProductsQuery
        variables={{
          categoryId: id,
          sort: {
            field: activeSortOrder.field,
            direction: activeSortOrder.direction
          }
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
    )}
  </SortOrdersProvider>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
