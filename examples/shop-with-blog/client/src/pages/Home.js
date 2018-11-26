import React from 'react';
import { NamespacesConsumer } from 'react-i18next-with-context';
import { H1, GridLayout } from '@deity/falcon-ui';
import { ProductsList, ProductsListQuery } from '@deity/falcon-ecommerce-uikit';

const Home = () => (
  <GridLayout gridGap="md" py="md">
    <NamespacesConsumer ns={['shop']}>
      {t => <H1 css={{ textAlign: 'center' }}>{t('home.hotSellers')}</H1>}
    </NamespacesConsumer>
    <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery>
  </GridLayout>
);

export default Home;
