import React from 'react';
import { Box, H1 } from '@deity/falcon-ui';
import { BlogPostsQuery, BlogPostsLayout, BlogPostExcerpt, BlogPostsPaginator } from '@deity/falcon-ecommerce-uikit';

const Blog = props => (
  <BlogPostsQuery
    variables={{
      pagination: {
        page: +props.match.params.page || 1
      }
    }}
  >
    {({ blogPosts, translations }) => (
      <Box as="section">
        <Box as="header" bgFullWidth="secondaryLight" py="xxl" css={{ textAlign: 'center' }}>
          <H1 fontSize="xxxl">{translations.title}</H1>
        </Box>

        <BlogPostsLayout>
          {blogPosts.items.map(item => (
            <BlogPostExcerpt key={item.slug} excerpt={item} translations={translations} />
          ))}
        </BlogPostsLayout>
        <BlogPostsPaginator pagination={blogPosts.pagination} translations={translations} />
      </Box>
    )}
  </BlogPostsQuery>
);

export default Blog;
