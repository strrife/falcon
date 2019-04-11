import React from 'react';
import LazyLoad from 'react-lazyload';
import { themed, Image, Text, List, ListItem } from '@deity/falcon-ui';
import { Price } from '../Locale';
import { ProductCardLayout } from './ProductCardLayout';

export const ProductsList: React.SFC<{ products: any[] }> = ({ products }) => (
  <ProductListLayout>
    {products.map((product: any) => (
      <ListItem key={product.id}>
        <ProductCardLayout to={product.urlPath}>
          <LazyLoad height="100%" offset={150}>
            <Image css={{ flex: '1 1 100%', minHeight: '0%' }} src={product.thumbnail} alt={product.name} />
          </LazyLoad>

          <Text py="xs" ellipsis>
            {product.name}
          </Text>

          <Price fontSize="md" value={product.price} />
        </ProductCardLayout>
      </ListItem>
    ))}
  </ProductListLayout>
);

export const ProductListLayout = themed({
  tag: List,
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
