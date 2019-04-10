import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { themed, Image, Text } from '@deity/falcon-ui';
import { Price } from '../Locale';

export type ProductsListProps = {
  products: any[];
};
export class ProductsList extends React.Component<ProductsListProps> {
  constructor(props: ProductsListProps) {
    super(props);

    this.state = {
      getPrevProps: () => this.props
    };
  }

  static getDerivedStateFromProps(nextProps: ProductsListProps, prevState: any) {
    const { products: prevProducts } = prevState.getPrevProps();
    const { products: nextProducts } = nextProps;

    if (prevProducts !== nextProducts) {
      setTimeout(() => forceCheck());
    }

    return null;
  }

  render() {
    const { products } = this.props;
    return (
      <ProductListLayout>
        {products.map((product: any) => (
          <li key={product.id}>
            <ProductCardLayout to={product.urlPath}>
              <LazyLoad key={product.id}>
                <Image
                  key={product.id}
                  css={{ flex: '1 1 100%', minHeight: '0%' }}
                  src={product.thumbnail}
                  alt={product.name}
                />
              </LazyLoad>
              <Text py="xs" ellipsis>
                {product.name}
              </Text>
              <Price fontSize="md" value={product.price} />
            </ProductCardLayout>
          </li>
        ))}
      </ProductListLayout>
    );
  }
}

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
