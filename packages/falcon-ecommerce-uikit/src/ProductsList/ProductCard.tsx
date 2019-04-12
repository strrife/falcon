import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { themed, Image, Text, FlexLayout } from '@deity/falcon-ui';
import { Price } from '../Locale';
import { Product } from './ProductsListQuery';

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

export type ProductCardProps = {
  product: Product;
};
export const ProductCard: React.SFC<ProductCardProps> = ({ product }) => {
  const { price } = product;
  return (
    <ProductCardLayout to={product.urlPath}>
      <LazyLoad height="100%" offset={150}>
        <Image css={{ flex: '1 1 100%', minHeight: '0%' }} src={product.thumbnail} alt={product.name} />
      </LazyLoad>
      <Text py="xs" ellipsis>
        {product.name}
      </Text>
      <FlexLayout>
        {price.special ? (
          <React.Fragment>
            <Price fontSize="sm" value={price.regular} />
            <Price fontSize="md" color="error" value={price.special} />
          </React.Fragment>
        ) : (
          <Price fontSize="md" value={price.regular} />
        )}
      </FlexLayout>
    </ProductCardLayout>
  );
};
