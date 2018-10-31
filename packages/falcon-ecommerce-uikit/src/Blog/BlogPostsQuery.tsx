import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_BLOG_POSTS = gql`
  query BlogPosts {
    blogPosts {
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

export type BlogPostExcerptType = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  image?: {
    url: string;
    description: string;
  };
};

export type BlogPagination = {
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
  perPage: number;
  totalPages: number;
};

export type BlogPosts = {
  blogPosts: {
    items: BlogPostExcerptType;
    pagination: BlogPagination;
  };
};

function getTranslations(t: reactI18Next.TranslationFunction) {
  return {
    title: t('title'),
    readMore: t('readMore')
  };
}

export type BlogPostsTranslations = ReturnType<typeof getTranslations>;

export class BlogPostsQuery extends Query<BlogPosts, {}, BlogPostsTranslations> {
  static defaultProps = {
    query: GET_BLOG_POSTS,
    getTranslations,
    translationsNamespaces: ['blog']
  };
}
