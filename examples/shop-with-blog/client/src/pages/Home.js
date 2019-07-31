import React from 'react';
import gql from 'graphql-tag';
import { H1 } from '@deity/falcon-ui';
import { PageLayout } from '@deity/falcon-ui-kit';
import { T } from '@deity/falcon-i18n';
import { Query, ProductList } from '@deity/falcon-ecommerce-uikit';

const HOMEPAGE_PRODUCTS_QUERY = gql`
  query HomepageProducts($categoryId: String!, $amount: Int) {
    category(id: $categoryId) {
      products(pagination: { perPage: $amount, page: 1 }) {
        items {
          id
          name
          price {
            regular
            special
            minTier
          }
          thumbnail
          urlPath
        }
      }
    }
  }
`;

const Home = () => (
  <PageLayout>
    <H1 css={{ textAlign: 'center' }}>
      <T id="home.hotSellers" />
    </H1>
    <Query query={HOMEPAGE_PRODUCTS_QUERY} variables={{ categoryId: '25', amount: 20 }}>
      {({ category }) => <ProductList products={category.products.items} />}
    </Query>
  </PageLayout>
);

export default Home;
