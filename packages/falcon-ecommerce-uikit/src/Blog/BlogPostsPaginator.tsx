import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, DefaultThemeProps, Link, Icon } from '@deity/falcon-ui';
import { BlogPagination, BlogPostsTranslations } from './BlogPostsQuery';

const blogPostsPaginatorLayout: DefaultThemeProps = {
  blogPostsPaginatorLayout: {
    display: 'flex',
    my: 'xxxl'
  }
};

type BlogPostsPaginatorProps = {
  pagination: BlogPagination;
  translations: BlogPostsTranslations;
  blogUrlBase: string;
};

export const BlogPostsPaginator: React.SFC<BlogPostsPaginatorProps> = ({ pagination, translations, blogUrlBase }) => (
  <Box defaultTheme={blogPostsPaginatorLayout} justifyContent={!pagination.prevPage ? 'flex-end' : 'space-between'}>
    {pagination.prevPage && (
      <Link
        display="flex"
        lineHeight="small"
        fontSize="md"
        as={RouterLink}
        to={`${blogUrlBase}/${pagination.prevPage}`}
      >
        <Icon size="md" mr="xs" src="prevPage" /> {translations.newerEntries}
      </Link>
    )}
    {pagination.nextPage && (
      <Link
        display="flex"
        lineHeight="small"
        fontSize="md"
        as={RouterLink}
        to={`${blogUrlBase}/${pagination.nextPage}`}
      >
        {translations.olderEntries} <Icon ml="xs" size="md" src="nextPage" />
      </Link>
    )}
  </Box>
);

BlogPostsPaginator.defaultProps = {
  blogUrlBase: '/blog'
};
