import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { Image, Text, FlexLayout } from '@deity/falcon-ui';
import { Price } from '../Price';
import { ProductCardLayout } from './ProductCardLayout';

export type ProductCardProps = {
  id: string;
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
