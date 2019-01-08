import React from 'react';
import { H1, H4, GridLayout, Button } from '@deity/falcon-ui';
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
    <LazyLoad height="calc(40vh + 10vw)">
      <BackgroundImage
        css={{ position: 'relative', paddingBottom: 'calc(40vh + 10vw)' }}
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      >
        <Box
          display="flex"
          color="white"
          position="absolute"
          alignItems="center"
          flexDirection="column"
          css={{ width: '100%', height: '100%' }}
          justifyContent="center"
        >
          <H1 fontWeight="demiBold" css={{ textShadow: '3px 4px 20px #0000004f' }}>
            <T id="home.heroText" />
          </H1>
          <Button as="a" href="/women.html" variant="cta">
            <T id="home.ctaButton" />
          </Button>
        </Box>
      </BackgroundImage>
    </LazyLoad>
    <GridLayout gridGap="md">
      <H4 fontWeight="demiBold" css={{ textAlign: 'center' }}>
        <T id="home.shopLooks" />
      </H4>
      <ProductsListQuery query={GET_PRODUCTS_LIST} variables={{ query: { perPage: 3 } }}>
        {({ products }) => <ProductsList products={products.items} />}
      </ProductsListQuery>
    </GridLayout>
  </React.Fragment>
);

export default Home;
