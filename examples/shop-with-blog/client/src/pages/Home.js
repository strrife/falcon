import React from 'react';
import { GET_CATEGORY_WITH_PRODUCT_LIST } from '@deity/falcon-shop-data';
import { Loader } from '@deity/falcon-data';
import { useQuery } from 'react-apollo';
import { T } from '@deity/falcon-i18n';
import { H1 } from '@deity/falcon-ui';
import { PageLayout, ProductList } from '@deity/falcon-ui-kit';

// const Home = () => (
//   <PageLayout>
//     <H1 css={{ textAlign: 'center' }}>
//       <T id="home.hotSellers" />
//     </H1>
//     <CategoryWithProductListQuery variables={{ categoryId: '25', query: { perPage: 1, page: 20 } }}>
//       {({
//         data: {
//           category: { productList }
//         }
//       }) => <ProductList items={productList.items} />}
//     </CategoryWithProductListQuery>
//   </PageLayout>
// );

const Home = () => {
  const { loading, data } = useQuery(GET_CATEGORY_WITH_PRODUCT_LIST, {
    variables: {
      categoryId: '25',
      query: {
        perPage: 1,
        page: 20
      }
    }
  });

  if (loading) {
    return <Loader />;
  }

  const {
    category: { productList }
  } = data;

  return (
    <PageLayout>
      <H1 css={{ textAlign: 'center' }}>
        <T id="home.hotSellers" />
      </H1>
      <ProductList items={productList.items} />
    </PageLayout>
  );
};

export default Home;
