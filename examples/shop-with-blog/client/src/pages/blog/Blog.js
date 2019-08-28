import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { Box, Breadcrumbs, Breadcrumb, Link, ListItem } from '@deity/falcon-ui';
import { BlogPostListLayout, BlogPostExcerpt } from '@deity/falcon-ui-kit';
import { BlogPostsQuery, BlogPostsPaginator } from '@deity/falcon-ecommerce-uikit';

const Blog = props => (
  <Box as="section">
    <Breadcrumbs my="md" alignSelf="flex-start">
      <Breadcrumb key="home">
        <Link to="/" as={RouterLink}>
          <T id="name" />
        </Link>
      </Breadcrumb>
      <Breadcrumb key="blog">
        <T id="blog.title" />
      </Breadcrumb>
    </Breadcrumbs>

    <BlogPostsQuery
      variables={{
        pagination: {
          page: +props.match.params.page || 1
        }
      }}
    >
      {({ blogPosts: { items, pagination } }) => (
        <React.Fragment>
          <BlogPostListLayout>
            {items.map((x, index) => (
              <ListItem key={x.slug} gridColumn={index < 2 ? 'span 3' : 'span 2'}>
                <BlogPostExcerpt title={x.title} slug={x.slug} date={x.date} image={x.image} excerpt={x.excerpt} />
              </ListItem>
            ))}
          </BlogPostListLayout>
          <BlogPostsPaginator pagination={pagination} />
        </React.Fragment>
      )}
    </BlogPostsQuery>
  </Box>
);

export default Blog;
