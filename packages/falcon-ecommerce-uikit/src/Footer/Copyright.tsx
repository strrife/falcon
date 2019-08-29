import React from 'react';
import { Box, Text, themed } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';

export const FooterBanner = themed({
  tag: Box,
  defaultTheme: {
    footerBanner: {
      display: 'grid',
      gridGap: 'sm',
      m: 'none',
      p: 'none',
      color: 'secondaryText',
      bgFullWidth: 'secondary',
      css: {
        textAlign: 'center'
      }
    }
  }
});

export const CopyrightInnerDOM = props => (
  <Text {...props}>
    <T id="copyright" year={new Date().getFullYear()} />
  </Text>
);

export const Copyright = themed({
  tag: CopyrightInnerDOM,
  defaultTheme: {
    copyright: {
      p: 'sm',
      color: 'secondaryText'
    }
  }
});
