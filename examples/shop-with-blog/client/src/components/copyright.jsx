import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';

export const CopyrightLayout = themed({
  tag: Box,
  defaultTheme: {
    copyrightLayout: {
      p: 'sm',
      bgFullWidth: 'secondary',
      css: {
        textAlign: 'center',
        color: 'read'
      }
    }
  }
});

export const Copyright = () => (
  <CopyrightLayout>
    This is shop-with-blog version of <T id="copyright" year={new Date().getFullYear()} />
  </CopyrightLayout>
);
