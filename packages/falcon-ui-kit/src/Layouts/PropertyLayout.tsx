import React from 'react';
import { themed, Box } from '@deity/falcon-ui';

export const PropertyLayout = themed({
  tag: Box,
  defaultTheme: {
    propertyLayout: {
      display: 'grid',
      gridGap: 'sm',
      gridAutoFlow: 'column',
      gridTemplateColumns: '1fr 2fr',
      variants: {
        spaceBetween: {
          gridTemplateColumns: '1fr auto'
        }
      }
    }
  }
});
