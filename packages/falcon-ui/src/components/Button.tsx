import { themed } from '../theme';

export const Button = themed({
  tag: 'button',

  defaultTheme: {
    button: {
      color: 'primaryText',
      bg: 'primary',
      borderRadius: 'medium',
      fontSize: 'sm',
      lineHeight: 'small',
      height: 'lg',
      px: 'md',
      transitionTimingFunction: 'easeIn',
      transitionDuration: 'short',

      css: ({ theme }) => ({
        // basic reset styles
        fontFamily: 'inherit',
        WebkitFontSmoothing: 'antialiased',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        border: 'none',
        textDecoration: 'none',
        appearance: 'none',
        ':focus': {
          outline: 'none'
        },
        // define transform that scales on active
        transitionProperty: 'transform',
        ':active': {
          transform: 'scale(0.95)'
        },
        ':hover': {
          backgroundColor: theme.colors.primaryLight
        }
      }),

      variants: {
        secondary: {
          bg: 'secondary',
          color: 'secondaryText',

          css: ({ theme }) => ({
            ':hover': {
              backgroundColor: theme.colors.secondaryLight
            }
          })
        }
      }
    }
  }
});
