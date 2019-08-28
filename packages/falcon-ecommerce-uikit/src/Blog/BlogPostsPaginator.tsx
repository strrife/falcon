import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Text, ThemedComponentProps, Link, Icon } from '@deity/falcon-ui';
import { BlogPostListPaginationLayout } from '@deity/falcon-ui-kit';
import { T } from '@deity/falcon-i18n';

type BlogPostsPaginatorProps = {
  pagination: any;
  blogUrlBase: string;
} & ThemedComponentProps;

export const BlogPostsPaginator: React.SFC<BlogPostsPaginatorProps> = ({ pagination, blogUrlBase, ...rest }) => (
  <BlogPostListPaginationLayout isPrevPage={pagination.prevPage} {...(rest as any)}>
    {pagination.prevPage && (
      <Link
        display="flex"
        lineHeight="small"
        fontSize="md"
        as={RouterLink}
        to={`${blogUrlBase}/${pagination.prevPage}`}
      >
        <Icon size="md" mr="xs" src="prevPage" />
        <Text>
          <T id="blog.newerEntries" />
        </Text>
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
        <T id="blog.olderEntries" /> <Icon ml="xs" size="md" src="nextPage" />
      </Link>
    )}
  </BlogPostListPaginationLayout>
);

BlogPostsPaginator.defaultProps = {
  blogUrlBase: '/blog'
};
