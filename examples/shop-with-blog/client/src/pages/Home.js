import React from 'react';
import { H1, H3, H4, GridLayout, Button } from '@deity/falcon-ui';
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

const Hero = () => (
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
);

const Category = () => (
  <LazyLoad height="50%">
    <Box display="grid" gridGap="xl" css={{ textAlign: 'center', gridTemplate: '"men women" / 1fr 1fr' }}>
      <Box gridArea="men">
        <BackgroundImage
          css={{ paddingBottom: '50%' }}
          src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=726&q=80"
        />
        <H3 fontWeight="demiBold" mt="md">
          <T id="home.menTitle" />
        </H3>
        <span>
          <T id="home.menText" />
        </span>
      </Box>
      <Box gridArea="women">
        <BackgroundImage
          css={{ paddingBottom: '50%' }}
          src="https://images.unsplash.com/photo-1501459277917-04a80f948092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
        />
        <H3 fontWeight="demiBold" mt="md">
          <T id="home.womenTitle" />
        </H3>
        <span>
          <T id="home.womenText" />
        </span>
      </Box>
    </Box>
  </LazyLoad>
);

const Home = () => (
  <React.Fragment>
    <Hero />
    <GridLayout gridGap="xl">
      <Category />
      <H4 fontWeight="demiBold" mt="lg" css={{ textAlign: 'center' }}>
        <span py="1px" style={{ borderBottom: '2px solid black' }}>
          <T id="home.shopLooks" />
        </span>
      </H4>
      <ProductsListQuery query={GET_PRODUCTS_LIST} variables={{ query: { perPage: 12 } }}>
        {({ products }) => <ProductsList products={products.items} />}
      </ProductsListQuery>
      {/* <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery> */}
    </GridLayout>
  </React.Fragment>
);

export default Home;
