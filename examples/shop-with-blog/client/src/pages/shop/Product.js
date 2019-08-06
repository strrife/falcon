import React from 'react';
import PropTypes from 'prop-types';
import { ProductQuery } from '@deity/falcon-shop-data';
import { PageLayout, Breadcrumbs } from '@deity/falcon-ui-kit';
import { Product } from '@deity/falcon-ecommerce-uikit';

const ProductPage = ({ id, path }) => (
  <ProductQuery variables={{ id, path }}>
    {({ product }) => (
      <PageLayout>
        <Breadcrumbs items={product.breadcrumbs} />
        <Product product={product} />
      </PageLayout>
    )}
  </ProductQuery>
);
ProductPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductPage;
