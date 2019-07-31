import React from 'react';
import { themed, Box } from '@deity/falcon-ui';

export const ProductLayout = themed({
  tag: Box,
  defaultTheme: {
    productLayout: {
      display: 'grid',
      gridGap: 'sm',
      my: 'md'
    }
  }
});
