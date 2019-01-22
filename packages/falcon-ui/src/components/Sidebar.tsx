import { themed } from '../theme';

export const Sidebar = themed({
  tag: 'div',

  defaultProps: {
    visible: false,
    side: 'left' as 'left' | 'right'
  },

  defaultTheme: {
    sidebar: {
      display: 'flex',
      bg: 'white',
      position: 'fixed',
      css: ({ visible, theme, side }) => ({
        top: 0,
        bottom: 0,
        [side]: 0,
        height: '100%',
        zIndex: theme.zIndex.sidebar,
        /* eslint-disable */
        animation: `${
          side === 'left'
            ? visible
              ? theme.keyframes.leftToRight
              : theme.keyframes.leftToRightReverse
            : visible
            ? theme.keyframes.rightToLeft
            : theme.keyframes.rightToLeftReverse
        } ${visible ? theme.transitionDurations.short : theme.transitionDurations.standard} forwards`
        /* eslint-enable */
      })
    }
  }
});
