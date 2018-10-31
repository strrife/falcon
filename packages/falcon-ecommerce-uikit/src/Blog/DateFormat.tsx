import React from 'react';
import { themed, Text } from '@deity/falcon-ui';

// TODO: move to locale folder when it get's merged in
// TODO: use locale provided by locale

const DateFormatInnerDOM: React.SFC<{
  value: string;
}> = ({ value, ...rest }) => <Text {...rest}>{new Intl.DateTimeFormat('en').format(new Date(value))}</Text>;
export const DateFormat = themed({
  tag: DateFormatInnerDOM,
  defaultProps: {
    ellipsis: false
  },
  defaultTheme: {
    price: {
      display: 'block',
      m: 'none'
    }
  }
});
