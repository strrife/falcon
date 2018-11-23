import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NamespacesConsumer } from 'react-i18next-with-context';
import { Box, DefaultThemeProps, Link, Icon } from '@deity/falcon-ui';
import { BlogPagination } from './BlogPostsQuery';

const blogPostsPaginatorLayout: DefaultThemeProps = {
  blogPostsPaginatorLayout: {
    display: 'flex',
    my: 'xxxl'
  }
};

type BlogPostsPaginatorProps = {
  pagination: BlogPagination;
  blogUrlBase: string;
};

export const BlogPostsPaginator: React.SFC<BlogPostsPaginatorProps> = ({ pagination, blogUrlBase }) => (
  <NamespacesConsumer ns="blog">
    {t => (
      <Box defaultTheme={blogPostsPaginatorLayout} justifyContent={!pagination.prevPage ? 'flex-end' : 'space-between'}>
        {pagination.prevPage && (
          <Link
            display="flex"
            lineHeight="small"
            fontSize="md"
            as={RouterLink}
            to={`${blogUrlBase}/${pagination.prevPage}`}
          >
            <Icon size="md" mr="xs" src="prevPage" /> {t('newerEntries')}
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
            {t('olderEntries')} <Icon ml="xs" size="md" src="nextPage" />
          </Link>
        )}
      </Box>
    )}
  </NamespacesConsumer>
);

BlogPostsPaginator.defaultProps = {
  blogUrlBase: '/blog'
};
