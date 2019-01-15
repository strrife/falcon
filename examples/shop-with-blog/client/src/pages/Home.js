import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { H1, H2, H3, GridLayout, Button } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { ProductsList, ProductsListQuery, Query } from '@deity/falcon-ecommerce-uikit';
import { BackgroundImage, Box, Link } from '@deity/falcon-ui';
import LazyLoad from 'react-lazyload';
import gql from 'graphql-tag';

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

const getSubheroItem = gql`
  query {
    config @client {
      subheroItem {
        title
        image
        url
        text
      }
    }
  }
`;

const subheroStyle = {
  subheroStyle: {
    css: {
      ':hover': {
        '.backgroundImage': {
          transform: 'scale(0.98)'
        }
      }
    }
  }
};

const subheroGrid = {
  subheroGrid: {
    gridTemplate: '"0 1" / 1fr 1fr',
    css: {
      textAlign: 'center'
    }
  }
};

class Hero extends Component {
  componentDidMount() {
    document.addEventListener(
      'scroll',
      () => {
        this.parallax();
      },
      true
    );
  }

  parallax = () => {
    let yPos = window.pageYOffset / this.parallaxImage.dataset.speed;
    yPos = -yPos;

    const coords = `0% ${50 + yPos * 0.2}%`;

    this.parallaxImage.style.backgroundPosition = coords;
  };

  render() {
    return (
      <LazyLoad height="calc(40vh + 10vw)">
        <BackgroundImage
          css={{ position: 'relative', paddingBottom: 'calc(40vh + 10vw)' }}
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          id="slider"
          data-type="background"
          data-speed="4"
          ref={ref => {
            this.parallaxImage = ref;
          }}
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
            <Button as={RouterLink} to="/women.html" variant="cta">
              <T id="home.ctaButton" />
            </Button>
          </Box>
        </BackgroundImage>
      </LazyLoad>
    );
  }
}

const Category = () => (
  <Query query={getSubheroItem}>
    {data => (
      <Box display="grid" gridGap="xl" defaultTheme={subheroGrid}>
        {data.config.subheroItem.map((item, i) => (
          <Link as={RouterLink} to={item.url} key={item.url}>
            <Box gridArea={i} defaultTheme={subheroStyle}>
              <LazyLoad>
                <BackgroundImage
                  className="backgroundImage"
                  css={{ transitionTimingFunction: 'easeIn', transitionDuration: '1s' }}
                  ratio="0.5"
                  src={item.image}
                />
              </LazyLoad>
              <H2 fontWeight="demiBold" mt="md">
                <T id={item.title} />
              </H2>
              <span>
                <T id={item.text} />
              </span>
            </Box>
          </Link>
        ))}
      </Box>
    )}
  </Query>
);

const Home = () => (
  <React.Fragment>
    <Hero />
    <GridLayout p="xl" css={{ margin: 'auto', maxWidth: 1280 }}>
      <Category />
      <H3 fontWeight="demiBold" mt="lg" css={{ textAlign: 'center' }}>
        <span py="1px" style={{ borderBottom: '2px solid black' }}>
          <T id="home.shopLooks" />
        </span>
      </H3>
      <ProductsListQuery query={GET_PRODUCTS_LIST} variables={{ query: { perPage: 12 } }}>
        {({ products }) => <ProductsList products={products.items} />}
      </ProductsListQuery>
      {/* <ProductsListQuery>{({ products }) => <ProductsList products={products.items} />}</ProductsListQuery> */}
    </GridLayout>
  </React.Fragment>
);

export default Home;
