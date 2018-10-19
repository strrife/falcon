import { themed } from '../theme';

export const Breadcrumbs = themed({
  tag: 'ul',

  defaultTheme: {
    breadcrumbs: {
      p: 'none',
      m: 'none',

      css: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none'
      }
    }
  }
});

export const Breadcrumb = themed({
  tag: 'li',

  defaultTheme: {
    breadcrumb: {
      css: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',

        '::after': {
          content: '"→"',
          color: 'inherit',
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          display: 'block'
        },

        ':last-child': {
          pointerEvents: 'none',
          color: theme.colors.primary,
          '::after': {
            display: 'none'
          }
        }
      })
    }
  }
});
