import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { themed, Image, Text, FlexLayout } from '@deity/falcon-ui';
import { Price } from '@deity/falcon-ui-kit';

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
  name: string;
  thumbnail: string;
  urlPath: string;
  price;
};
export const ProductCard: React.SFC<ProductCardProps> = ({ name, thumbnail, urlPath, price }) => {
  return (
    <ProductCardLayout to={urlPath}>
      <LazyLoad height="100%" offset={150}>
        <Image css={{ flex: '1 1 100%', minHeight: '0%' }} src={thumbnail} alt={name} />
      </LazyLoad>
      <Text py="xs" ellipsis>
        {name}
      </Text>
      <FlexLayout>
        {price.special ? (
          <React.Fragment>
            <Price value={price.regular} fontSize="md" variant="old" mr="xs" />
            <Price value={price.special} fontSize="md" variant="special" />
          </React.Fragment>
        ) : (
          <Price value={price.regular} fontSize="md" />
        )}
      </FlexLayout>
    </ProductCardLayout>
  );
};
