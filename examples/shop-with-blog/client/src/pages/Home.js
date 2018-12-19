import React from 'react';
import { H1, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ProductsList, ProductsListQuery } from '@deity/falcon-ecommerce-uikit';
import { BackgroundImage, Box } from '@deity/falcon-ui';
import LazyLoad from 'react-lazyload';

const Home = () => (
  <GridLayout gridGap="md" py="md">
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
    <H1 css={{ textAlign: 'center' }}>
      <T id="home.hotSellers" />
    </H1>
    <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery>
  </GridLayout>
);

export default Home;
