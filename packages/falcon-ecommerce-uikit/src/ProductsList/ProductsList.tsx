import React from 'react';
import { forceCheck } from 'react-lazyload';
import { themed, List, ListItem } from '@deity/falcon-ui';
import { ProductCard } from './ProductCard';

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
      setTimeout(forceCheck);
    }

    return null;
  }

  render() {
    const { products } = this.props;
    return (
      <ProductListLayout>
        {products.map((product: any) => (
          <ListItem key={product.id}>
            <ProductCard product={product} />
          </ListItem>
        ))}
      </ProductListLayout>
    );
  }
}

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
