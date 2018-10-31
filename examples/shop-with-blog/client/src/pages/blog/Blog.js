import React from 'react';
import { Box, H1 } from '@deity/falcon-ui';
import { BlogPostsQuery, BlogPostsLayout, BlogPostExcerpt } from '@deity/falcon-ecommerce-uikit';

const Blog = () => (
  <BlogPostsQuery>
    {props => (
      <Box as="section">
        <Box as="header" bgFullWidth="secondaryLight" py="xxl" css={{ textAlign: 'center' }}>
          <H1 fontSize="xxxl">{props.translations.title}</H1>
        </Box>

        <BlogPostsLayout>
          {props.blogPosts.items.map(item => (
            <BlogPostExcerpt key={item.slug} excerpt={item} translations={props.translations} />
          ))}
        </BlogPostsLayout>
      </Box>
    )}
  </BlogPostsQuery>
);

export default Blog;
