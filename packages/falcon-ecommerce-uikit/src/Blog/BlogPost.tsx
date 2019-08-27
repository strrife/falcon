import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { H1, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { FormattedDate, BlogPostLayout } from '@deity/falcon-ui-kit';
import { CMSContent } from './CmsContent';

export type BlogPostProps = {
  title: string;
  date: Date;
  content: string;
};
export const BlogPost: React.SFC<BlogPostProps> = ({ title, content, date }) => (
  <BlogPostLayout>
    <Breadcrumbs my="md" alignSelf="flex-start">
      <Breadcrumb key="index">
        <Link to="/blog" as={RouterLink}>
          <T id="blog.title" />
        </Link>
      </Breadcrumb>
      <Breadcrumb key="post">{title}</Breadcrumb>
    </Breadcrumbs>
    <H1>{title}</H1>
    <FormattedDate mb="xl" value={date} />
    <CMSContent html={content} />
  </BlogPostLayout>
);
