import React from 'react';
import { Box, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { BlogPostsQuery, BlogPostsLayout, BlogPostExcerpt, BlogPostsPaginator } from '@deity/falcon-ecommerce-uikit';

const Blog = props => (
  <Box as="section">
    <Breadcrumbs my="md" alignSelf="flex-start">
      <Breadcrumb key="index">
        <Link to="/">Home</Link>
      </Breadcrumb>
      <Breadcrumb key="post">Blog</Breadcrumb>
    </Breadcrumbs>

    <BlogPostsQuery
      variables={{
        pagination: {
          page: +props.match.params.page || 1
        }
      }}
    >
      {({ blogPosts, translations }) => (
        <React.Fragment>
          <BlogPostsLayout>
            {blogPosts.items.map((item, index) => (
              <BlogPostExcerpt
                gridColumn={index < 2 ? 'span 3' : 'span 2'}
                key={item.slug}
                excerpt={item}
                translations={translations}
              />
            ))}
          </BlogPostsLayout>

          <BlogPostsPaginator pagination={blogPosts.pagination} translations={translations} />
        </React.Fragment>
      )}
    </BlogPostsQuery>
  </Box>
);

export default Blog;
