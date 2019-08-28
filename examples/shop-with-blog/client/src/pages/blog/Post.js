import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { BlogPostQuery } from '@deity/falcon-blog-data';
import { H1, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { BlogPostLayout, FormattedDate, CMSContent, PageLayout } from '@deity/falcon-ui-kit';

const Post = ({ path }) => (
  <BlogPostQuery variables={{ path }}>
    {({ blogPost }) => (
      <PageLayout>
        <Breadcrumbs alignSelf="flex-start">
          <Breadcrumb key="home">
            <Link to="/" as={RouterLink}>
              <T id="name" />
            </Link>
          </Breadcrumb>
          <Breadcrumb key="index">
            <Link to="/blog" as={RouterLink}>
              <T id="blog.title" />
            </Link>
          </Breadcrumb>
          <Breadcrumb key="post">{blogPost.title}</Breadcrumb>
        </Breadcrumbs>

        <BlogPostLayout>
          <H1>{blogPost.title}</H1>
          <FormattedDate mb="xl" value={blogPost.date} />
          <CMSContent html={blogPost.content} />
        </BlogPostLayout>
      </PageLayout>
    )}
  </BlogPostQuery>
);

export default Post;
