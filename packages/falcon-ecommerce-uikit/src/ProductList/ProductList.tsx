import React from 'react';
import { forceCheck } from 'react-lazyload';
import { ListItem } from '@deity/falcon-ui';
import { ProductListLayout, EmptyProductList } from '@deity/falcon-ui-kit';
import { ProductCard } from './ProductCard';

export type ProductListProps = {
  products: any[];
};
export class ProductList extends React.Component<ProductListProps> {
  constructor(props: ProductListProps) {
    super(props);

    this.state = {
      getPrevProps: () => this.props
    };
  }

  static getDerivedStateFromProps(nextProps: ProductListProps, prevState: any) {
    const { products: prevProducts } = prevState.getPrevProps();
    const { products: nextProducts } = nextProps;

    if (prevProducts !== nextProducts) {
      setTimeout(forceCheck);
    }

    return null;
  }

  render() {
    const { products } = this.props;

    if (!products.length) {
      return <EmptyProductList />;
    }

    return (
      <ProductListLayout>
        {products.map((product: any) => (
          <ListItem key={product.id}>
            <ProductCard {...product} />
          </ListItem>
        ))}
      </ProductListLayout>
    );
  }
}
