import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, H2, Text, Image, DefaultThemeProps, Link } from '@deity/falcon-ui';
import { BlogPostsTranslations, BlogPostExcerptType } from './BlogPostsQuery';
import { DateFormat } from '../Locale';
import { toGridTemplate } from '../helpers';

enum BlogPostEcerptArea {
  image = 'image',
  title = 'title',
  date = 'date',
  excerpt = 'excerpt',
  readMore = 'readMore'
}

const blogPostExcerptLayout: DefaultThemeProps = {
  blogPostExcerptLayout: {
    display: 'grid',
    gridRowGap: 'xs',
    gridColumnGap: 'lg',
    color: 'black',
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        [ '1fr',                      ],
        [ BlogPostEcerptArea.image    ],
        [ BlogPostEcerptArea.title    ],
        [ BlogPostEcerptArea.date     ],
        [ BlogPostEcerptArea.excerpt  ],
        [ BlogPostEcerptArea.readMore ]
      ]),

      md: toGridTemplate([
        [ '2fr',                      '1fr'                               ],
        [ BlogPostEcerptArea.date,     BlogPostEcerptArea.image           ],
        [ BlogPostEcerptArea.title,    BlogPostEcerptArea.image           ],
        [ BlogPostEcerptArea.excerpt,  BlogPostEcerptArea.image           ],
        [ BlogPostEcerptArea.readMore, BlogPostEcerptArea.image,     '1fr'],
      ])
    },
    css: {
      textDecoration: 'none'
    }
  }
};

export const BlogPostExcerpt: React.SFC<{ excerpt: BlogPostExcerptType; translations: BlogPostsTranslations }> = ({
  excerpt,
  translations
}) => (
  <Box as="li">
    <Link as={RouterLink} to={excerpt.slug} defaultTheme={blogPostExcerptLayout}>
      {excerpt.image && (
        <Image gridArea={BlogPostEcerptArea.image} src={excerpt.image.url} alt={excerpt.image.description} />
      )}
      <H2 gridArea={BlogPostEcerptArea.title}>{excerpt.title}</H2>
      <DateFormat gridArea={BlogPostEcerptArea.date} value={excerpt.date} />
      <Text fontSize="md" gridArea={BlogPostEcerptArea.excerpt}>
        {excerpt.excerpt}
      </Text>
      <Text gridArea={BlogPostEcerptArea.readMore}>{translations.readMore}</Text>
    </Link>
  </Box>
);
