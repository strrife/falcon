import gql from 'graphql-tag';
import { PaginationQuery } from '@deity/falcon-data';
import { BlogPost, BlogPostList } from '@deity/falcon-blog-extension';
import { Query } from '../Query/Query';

const GET_BLOG_POST_LIST = gql`
  query BlogPosts($pagination: PaginationInput) {
    blogPostList(pagination: $pagination) {
      items {
        title
        date
        slug
        excerpt
        image {
          url
          description
        }
      }
      pagination {
        currentPage
        nextPage
        prevPage
        perPage
        totalPages
      }
    }
  }
`;

export type BlogPostListResponse = {
  blogPostList: Pick<BlogPostList, 'pagination'> & {
    items: Pick<BlogPost, 'title' | 'date' | 'slug' | 'excerpt' | 'image'>[];
  };
};
export type BlogPostsQueryVariables = PaginationQuery;

export class BlogPostsQuery extends Query<BlogPostListResponse, BlogPostsQueryVariables> {
  static defaultProps = {
    query: GET_BLOG_POST_LIST
  };
}
