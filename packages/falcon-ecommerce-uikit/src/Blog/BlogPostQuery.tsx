import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_BLOG_POST = gql`
  query BlogPost($path: String!) {
    blogPost(path: $path) {
      title
      date
      content
    }
  }
`;

export type BlogPostType = {
  blogPost: {
    title: string;
    date: string;
    content: string;
  };
};

function getTranslations(t: reactI18Next.TranslationFunction) {
  return {
    blogTitle: t('title')
  };
}

export type BlogPostTranslations = ReturnType<typeof getTranslations>;

export type BlogPostQueryVariables = {
  path: string;
};

export class BlogPostQuery extends Query<BlogPostType, BlogPostQueryVariables, BlogPostTranslations> {
  static defaultProps = {
    query: GET_BLOG_POST,
    getTranslations,
    translationsNamespaces: ['blog']
  };
}
