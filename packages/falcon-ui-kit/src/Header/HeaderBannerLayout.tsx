import React from 'react';
import { List, themed } from '@deity/falcon-ui';

export const HeaderBannerLayout = themed({
  tag: List,
  defaultTheme: {
    headerBannerLayout: {
      display: 'flex',
      justifyContent: 'flex-end',
      bgFullWidth: 'secondaryLight',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});
