import { themed } from '@deity/falcon-ui';

export const BlogPostsLayout = themed({
  tag: 'ul',
  defaultTheme: {
    blogPostsLayout: {
      display: 'grid',
      my: 'xxl',
      mx: 'none',
      gridGap: 'xxxl',
      gridTemplateColumns: '1fr',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});
