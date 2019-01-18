import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { themed, Image, Text, Box } from '@deity/falcon-ui';
import { Price } from '../Locale';

export const ProductsList: React.SFC<{ products: any[] }> = ({ products }) => (
  <ProductListLayout>
    {products.map((product: any) => (
      <li key={product.id}>
        <ProductCardLayout to={product.urlPath}>
          <LazyLoad height="100%" offset={150}>
            <React.Fragment>
              <Box css={{ display: 'flex', maxHeight: '100%', position: 'relative' }}>
                <Box
                  transitionTimingFunction="easeIn"
                  transitionDuration="short"
                  css={{
                    backgroundColor: '#80808014',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 100,
                    ':hover': {
                      opacity: 0
                    }
                  }}
                />
                <Image css={{ flex: '1 1 100%', minHeight: '0%' }} src={product.thumbnail} alt={product.name} />
              </Box>
            </React.Fragment>
          </LazyLoad>

          <Text py="xs" ellipsis fontWeight="regular">
            {product.name}
          </Text>

          <Price value={product.price} />
        </ProductCardLayout>
      </li>
    ))}
  </ProductListLayout>
);

export const ProductListLayout = themed({
  tag: 'ul',
  defaultTheme: {
    productListLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
      gridAutoRows: '280px',
      gridGap: 'sm',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});

export const ProductCardLayout = themed({
  tag: Link,
  defaultTheme: {
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'secondaryText',

      css: {
        height: '100%',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer'
      }
    }
  }
});
