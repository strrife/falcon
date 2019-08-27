import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, H1, DefaultThemeProps, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { FormattedDate } from '@deity/falcon-ui-kit';
import { CMSContent } from './CmsContent';

const blogPostLayout: DefaultThemeProps = {
  blogPostLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 'xxxl'
  }
};

export type BlogPostProps = {
  title: string;
  date: Date;
  content: string;
};
export const BlogPost: React.SFC<BlogPostProps> = ({ title, content, date }) => (
  <Box as="article" defaultTheme={blogPostLayout}>
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
  </Box>
);
