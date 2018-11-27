import React from 'react';
import { Box, H1 } from '@deity/falcon-ui';
import { BlogPostsQuery, BlogPostsLayout, BlogPostExcerpt, BlogPostsPaginator, T } from '@deity/falcon-ecommerce-uikit';

const Blog = props => (
  <BlogPostsQuery variables={{ pagination: { page: +props.match.params.page || 1 } }}>
    {({ blogPosts }) => (
      <Box as="section">
        <BlogPostTitle />
        <BlogPostsLayout>
          {blogPosts.items.map(item => (
            <BlogPostExcerpt key={item.slug} excerpt={item} />
          ))}
        </BlogPostsLayout>
        <BlogPostsPaginator pagination={blogPosts.pagination} />
      </Box>
    )}
  </BlogPostsQuery>
);

const BlogPostTitle = () => (
  <Box as="header" bgFullWidth="secondaryLight" py="xxl" css={{ textAlign: 'center' }}>
    <H1 fontSize="xxxl">
      <T id="blog.title" />
    </H1>
  </Box>
);

export default Blog;
