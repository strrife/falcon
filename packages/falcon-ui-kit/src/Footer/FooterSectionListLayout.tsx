import React from 'react';
import { Box, themed } from '@deity/falcon-ui';

export const FooterSectionListLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSectionListLayout: {
      display: 'flex',
      css: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        justifyItems: 'center',
        flexWrap: 'wrap'
      }
    }
  }
});

export const FooterSectionLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSection: {
      p: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      css: {
        minWidth: 250,
        textAlign: {
          md: 'unset',
          xs: 'center'
        },
        alignItems: {
          md: 'unset',
          xs: 'center'
        }
      }
    }
  }
});
