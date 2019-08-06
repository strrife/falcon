import gql from 'graphql-tag';
import { Query, Pagination, PaginationInput, Aggregation, SortOrderInput } from '@deity/falcon-data';
import { Category, Product, FilterInput } from '@deity/falcon-shop-extension';

export const GET_CATEGORY_WITH_PRODUCTS = gql`
  query CategoryWithProducts(
    $categoryId: ID
    $sort: SortOrderInput
    $pagination: PaginationInput
    $filters: [FilterInput]
  ) {
    category(id: $categoryId) {
      id
      name
      products(sort: $sort, pagination: $pagination, filters: $filters) {
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
        pagination {
          currentPage
          totalItems
          nextPage
        }
        aggregations {
          field
          type
          buckets {
            value
            count
            title
          }
          title
        }
      }
    }
  }
`;

export type CategoryWithProductsResponse = Pick<Category, 'id' | 'name'> & {
  products: {
    items: Pick<Product, 'id' | 'name' | 'price' | 'thumbnail' | 'urlPath'>[];
    pagination: Pick<Pagination, 'currentPage' | 'totalItems' | 'nextPage'>;
    aggregations: Pick<Aggregation, 'field' | 'type' | 'title' | 'buckets'>;
  };
};

export type CategoryWithProductsVariables = {
  categoryId?: string;
  sort?: SortOrderInput;
  pagination?: PaginationInput;
  filters?: FilterInput[];
};

const fetchMore = (data: any, apolloFetchMore: any) =>
  apolloFetchMore({
    variables: {
      pagination: {
        page: data.category.products.pagination.nextPage
      }
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) {
        return prev;
      }

      return {
        ...prev,
        category: {
          ...prev.category,
          products: {
            ...prev.category.products,
            items: [...prev.category.products.items, ...fetchMoreResult.category.products.items],
            pagination: { ...fetchMoreResult.category.products.pagination }
          }
        }
      };
    }
  });

export class CategoryWithProductsQuery extends Query<CategoryWithProductsResponse, CategoryWithProductsVariables> {
  static defaultProps = {
    query: GET_CATEGORY_WITH_PRODUCTS,
    fetchPolicy: 'cache-and-network',
    fetchMore,
    notifyOnNetworkStatusChange: true
  };
}
