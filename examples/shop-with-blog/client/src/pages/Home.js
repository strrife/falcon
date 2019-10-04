import React from 'react';
import { GET_CATEGORY_WITH_PRODUCT_LIST } from '@deity/falcon-shop-data';
import { useQuery } from '@deity/falcon-data';
import { T } from '@deity/falcon-i18n';
import { H1 } from '@deity/falcon-ui';
import { PageLayout, ProductList, Loader, OperationError } from '@deity/falcon-ui-kit';

const Home = () => {
  const categoryProducts = () => {
    const { data, loading, error } = useQuery(GET_CATEGORY_WITH_PRODUCT_LIST, {
      variables: {
        categoryId: '25',
        query: {
          perPage: 1,
          page: 20
        }
      }
    });
    if (error) {
      return <OperationError {...error} />;
    }

    if (loading) {
      return <Loader />;
    }

    return <ProductList items={data.category.productList.items} />;
  };

  return (
    <PageLayout>
      <H1 css={{ textAlign: 'center' }}>
        <T id="home.hotSellers" />
      </H1>
      {categoryProducts()}
    </PageLayout>
  );
};

export default Home;
