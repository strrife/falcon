import gql from 'graphql-tag';
import { Query } from '../Query';

export type ProductPrice = {
  regular: string;
  special: string;
  minTier: string;
  min: string;
  max: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  image?: string;
  urlPath: string;
  thumbnail?: string;
  price: ProductPrice;
  priceType: string;
  minPrice: string;
  maxPrice: string;
  currency: string;
  description: string;
  stock: any; // Stock
  type: string;
  configurableOptions: []; // [ConfigurableProductOption]
  bundleOptions: []; // [BundleProductOption]
  gallery: []; // [GalleryEntry]
  seo: any; // ProductSeo
};

export const GET_PRODUCTS_LIST = gql`
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

export type Products = {
  items: Product[];
};

export class ProductsListQuery extends Query<Products> {
  static defaultProps = {
    query: GET_PRODUCTS_LIST
  };
}
