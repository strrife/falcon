import React from 'react';
import PropTypes from 'prop-types';
import { CategoryProductsQuery, Category } from '@deity/falcon-ecommerce-uikit';

const CategoryPage = ({ id }) => (
  <CategoryProductsQuery variables={{ categoryId: id }}>
    {categoryProps => <Category {...categoryProps} />}
  </CategoryProductsQuery>
);
CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
