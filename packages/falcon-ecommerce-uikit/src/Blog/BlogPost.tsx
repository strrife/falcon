import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, H1, DefaultThemeProps, Breadcrumbs, Breadcrumb, Link } from '@deity/falcon-ui';
import { BlogPostType, BlogPostTranslations } from './BlogPostQuery';
import { DateFormat } from '../Locale';
import { CMSContent } from './CmsContent';

const blogPostLayout: DefaultThemeProps = {
  blogPostLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 'xxxl'
  }
};

export const BlogPost: React.SFC<BlogPostType & { translations: BlogPostTranslations }> = ({
  blogPost,
  translations
}) => (
  <Box as="article" defaultTheme={blogPostLayout}>
    <Breadcrumbs my="md" alignSelf="flex-start">
      <Breadcrumb key="index">
        <Link to="/blog" as={RouterLink}>
          {translations.blogTitle}
        </Link>
      </Breadcrumb>
      <Breadcrumb key="post">{blogPost.title}</Breadcrumb>
    </Breadcrumbs>
    <H1>{blogPost.title}</H1>
    <DateFormat mb="xl" value={blogPost.date} />
    <CMSContent html={blogPost.content} />
  </Box>
);
