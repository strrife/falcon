import { themed } from '@deity/falcon-ui';

export const Text = themed({
  tag: 'p',
  defaultProps: {
    ellipsis: false
  },
  defaultTheme: {
    text: {
      display: 'block',
      m: 'none',
      css: ({ ellipsis }) => ({
        color: 'blue',
        ...(ellipsis ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {})
      })
    }
  }
});
