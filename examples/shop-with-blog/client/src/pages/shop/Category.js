import React from 'react';
import PropTypes from 'prop-types';
import { SearchConsumer, CategoryProductsQuery, Category } from '@deity/falcon-ecommerce-uikit';

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
        {categoryProps => <Category {...categoryProps} />}
      </CategoryProductsQuery>
    )}
  </SearchConsumer>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
