import React from 'react';
import { BlogPostQuery } from '@deity/falcon-blog-data';
import { Link as RouterLink } from 'react-router-dom';
import { H1, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { FormattedDate, BlogPostLayout } from '@deity/falcon-ui-kit';
import { CMSContent } from './CmsContent';

const Post = ({ path }) => (
  <BlogPostQuery variables={{ path }}>
    {({ blogPost }) => (
      <BlogPostLayout>
        <Breadcrumbs my="md" alignSelf="flex-start">
          <Breadcrumb key="index">
            <Link to="/blog" as={RouterLink}>
              <T id="blog.title" />
            </Link>
          </Breadcrumb>
          <Breadcrumb key="post">{blogPost.title}</Breadcrumb>
        </Breadcrumbs>

        <H1>{blogPost.title}</H1>
        <FormattedDate mb="xl" value={blogPost.date} />
        <CMSContent html={blogPost.content} />
      </BlogPostLayout>
    )}
  </BlogPostQuery>
);

export default Post;
