import { themed } from '../theme';

export const Select = themed({
  tag: 'select',

  defaultTheme: {
    select: {
      py: 'xs',
      px: 'sm',
      border: 'regular',
      borderRadius: 'medium',
      borderColor: 'secondaryDark',

      css: ({ theme }) => ({
        display: 'block',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        width: '100%',
        outline: 'none',
        position: 'relative',
        ':focus': {
          outline: 'none',
          borderColor: theme.colors.secondary
        }
      })
    }
  }
});

export const Option = themed({
  tag: 'option',

  defaultTheme: {
    option: {
      p: 'xs',
      fontSize: 'sm',
      css: {
        fontFamily: 'inherit'
      }
    }
  }
});
