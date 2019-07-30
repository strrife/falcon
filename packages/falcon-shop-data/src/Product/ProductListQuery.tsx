import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Product } from '@deity/falcon-shop-extension';

export const GET_PRODUCT_LIST = gql`
  query Products {
    products {
      items {
        id
        name
        price {
          regular
          special
          minTier
        }
        thumbnail
        urlPath
      }
    }
  }
`;

export type ProductListResponse = {
  items: Pick<Product, 'id' | 'name' | 'price' | 'thumbnail' | 'urlPath'>[];
};

export class ProductListQuery extends Query<ProductListResponse> {
  static defaultProps = {
    query: GET_PRODUCT_LIST,
    fetchPolicy: 'cache-and-network'
  };
}
