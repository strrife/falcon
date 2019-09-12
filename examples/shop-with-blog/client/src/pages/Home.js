import React from 'react';
import { CategoryWithProductListQuery } from '@deity/falcon-shop-data';
import { T } from '@deity/falcon-i18n';
import { H1 } from '@deity/falcon-ui';
import { PageLayout, ProductList } from '@deity/falcon-ui-kit';

const Home = () => (
  <PageLayout>
    <H1 css={{ textAlign: 'center' }}>
      <T id="home.hotSellers" />
    </H1>
    <CategoryWithProductListQuery variables={{ categoryId: '25', query: { perPage: 1, page: 20 } }}>
      {({
        data: {
          category: { productList }
        }
      }) => <ProductList items={productList.items} />}
    </CategoryWithProductListQuery>
  </PageLayout>
);

export default Home;
