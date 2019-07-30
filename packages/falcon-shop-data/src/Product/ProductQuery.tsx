import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Product, GalleryEntry, ConfigurableProductOption } from '@deity/falcon-shop-extension';

export const GET_PRODUCT = gql`
  query Product($id: String!, $path: String!) {
    product(id: $id) {
      id
      sku
      name
      description
      price {
        regular
        special
        minTier
      }
      tierPrices {
        qty
        value
        discount
      }
      currency
      gallery {
        full
        thumbnail
      }
      configurableOptions {
        id
        attributeId
        label
        productId
        values {
          valueIndex
          label
          inStock
        }
      }
      seo {
        title
        description
        keywords
      }
      breadcrumbs(path: $path) {
        name
        urlPath
      }
    }
  }
`;

export type ProductResponse = {
  product: Pick<
    Product,
    'id' | 'sku' | 'name' | 'description' | 'price' | 'tierPrices' | 'currency' | 'seo' | 'breadcrumbs'
  > & {
    gallery: Pick<GalleryEntry, 'full' | 'thumbnail'>[];
    configurableOptions: Pick<ConfigurableProductOption, 'id' | 'attributeId' | 'label' | 'productId' | 'values'>[];
  };
};

export class ProductQuery extends Query<ProductResponse> {
  static defaultProps = {
    query: GET_PRODUCT,
    fetchPolicy: 'cache-and-network'
  };
}
