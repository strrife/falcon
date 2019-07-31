import React from 'react';
import { themed, Box } from '@deity/falcon-ui';

export const ProductDescriptionLayout = themed({
  tag: Box,

  defaultTheme: {
    productDescriptionLayout: {
      css: {
        p: {
          margin: 0
        }
      }
    }
  }
});
