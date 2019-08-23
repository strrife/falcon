import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';

export const HeaderSearchBarArea = {
  logo: 'logo',
  signIn: 'signIn',
  cart: 'cart',
  search: 'search'
};

export const HeaderSearchBarLayout = themed({
  tag: Box,
  defaultTheme: {
    headerSearchBarLayout: {
      display: 'grid',
      py: 'sm',
      gridGap: 'sm',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['200px',                  '1fr',                      'auto',                     'auto'                  ],
        [HeaderSearchBarArea.logo, HeaderSearchBarArea.search, HeaderSearchBarArea.signIn, HeaderSearchBarArea.cart]
      ]),
      css: {
        alignItems: 'center'
      }
    }
  }
});
