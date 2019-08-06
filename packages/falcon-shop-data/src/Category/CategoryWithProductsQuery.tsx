import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Category } from '@deity/falcon-shop-extension';

export const GET_CATEGORY_WITH_PRODUCTS = gql`
  query CategoryWithProducts(
    $categoryId: String!
    $sort: SortOrderInput
    $pagination: PaginationInput
    $filters: [FilterInput]
  ) {
    category(id: $categoryId) {
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

export class CategoryWithProductsQuery extends Query<any> {
  static defaultProps = {
    query: GET_CATEGORY_WITH_PRODUCTS,
    fetchPolicy: 'cache-and-network',
    fetchMore,
    notifyOnNetworkStatusChange: true
  };
}
