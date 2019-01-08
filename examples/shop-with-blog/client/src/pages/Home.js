import React from 'react';
import { H1, H4, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ProductsList, ProductsListQuery } from '@deity/falcon-ecommerce-uikit';
import { BackgroundImage, Box } from '@deity/falcon-ui';
import LazyLoad from 'react-lazyload';
import gql from 'graphql-tag';
// import FadeOverlay from '../components/FadeOverlay';

const GET_PRODUCTS_LIST = gql`
  query Products($query: ShopPageQuery) {
    products(query: $query) {
      items {
        id
        name
        price
        thumbnail
        urlPath
      }
    }
  }
`;

const Home = () => (
  <React.Fragment>
    <LazyLoad>
      <BackgroundImage
        css={{ position: 'relative' }}
        ratio={0.4}
        src="https://magento.deity.io/media/wysiwyg/home/home-main.jpg"
      >
        <Box
          display="flex"
          color="white"
          position="absolute"
          alignItems="center"
          css={{ width: '100%', height: '100%' }}
          justifyContent="center"
        >
          <H1>New Collection</H1>
        </Box>
      </BackgroundImage>
    </LazyLoad>
    <GridLayout gridGap="md">
      <H4 css={{ textAlign: 'center', fontWeight: 'demiBold' }}>
        <T id="home.shopLooks" />
      </H4>
      <ProductsListQuery query={GET_PRODUCTS_LIST} variables={{ query: { perPage: 3 } }}>
        {({ products }) => <ProductsList products={products.items} />}
      </ProductsListQuery>
    </GridLayout>
  </React.Fragment>
);

export default Home;
