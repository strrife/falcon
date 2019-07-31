import React from 'react';
import { themed, Box } from '@deity/falcon-ui';

const ProductDescriptionInnerHTML = ({ value, ...rest }) => (
  <Box {...rest} dangerouslySetInnerHTML={{ __html: value }} />
);

export const ProductDescription = themed({
  tag: ProductDescriptionInnerHTML,
  defaultTheme: {
    productDescription: {
      css: {
        p: {
          margin: 0
        }
      }
    }
  }
});
