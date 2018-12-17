import React from 'react';
import { H1, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ProductsList, ProductsListQuery } from '@deity/falcon-ecommerce-uikit';

const Home = () => (
  <GridLayout gridGap="md" py="ld">
    <H1 css={{ textAlign: 'center' }}>
      <T id="home.hotSellers" />
    </H1>
    <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery>
  </GridLayout>
);

export default Home;
