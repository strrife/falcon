import { themed } from '@deity/falcon-ui';

export const Text = themed({
  tag: 'span',
  defaultProps: {
    ellipsis: false
  },
  defaultTheme: {
    text: {
      display: 'block',
      m: 'none',
      css: ({ ellipsis }) => ({
        color: 'red',
        ...(ellipsis ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {})
      })
    }
  }
});
