import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { H3, Text, Image, ListItem } from '@deity/falcon-ui';
import { FormattedDate, BlogPostExcerptLayout } from '@deity/falcon-ui-kit';
import { BlogPostExcerptType } from './BlogPostsQuery';

const BlogPostExcerptArea = {
  image: 'image',
  title: 'title',
  date: 'date',
  excerpt: 'excerpt',
  readMore: 'readMore'
};

export const BlogPostExcerpt: React.SFC<{ excerpt: BlogPostExcerptType }> = ({ excerpt, ...rest }) => (
  <ListItem {...rest}>
    <BlogPostExcerptLayout as={RouterLink} to={excerpt.slug}>
      {excerpt.image && (
        <Image
          css={{ height: 300 }}
          gridArea={BlogPostExcerptArea.image}
          src={excerpt.image.url}
          alt={excerpt.image.description}
        />
      )}
      <H3 gridArea={BlogPostExcerptArea.title}>{excerpt.title}</H3>
      <FormattedDate gridArea={BlogPostExcerptArea.date} value={excerpt.date} />
      <Text gridArea={BlogPostExcerptArea.excerpt}>{excerpt.excerpt}</Text>
      <Text gridArea={BlogPostExcerptArea.readMore} css={{ textDecoration: 'underline' }}>
        <T id="blog.readMore" />
      </Text>
    </BlogPostExcerptLayout>
  </ListItem>
);
