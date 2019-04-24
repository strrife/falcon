import React from 'react';
import { List, themed } from '@deity/falcon-ui';

export const FilterItemsList = themed({
  tag: List,
  defaultTheme: {
    filterItemsList: {
      css: {
        listStyle: 'none'
      }
    }
  }
});
