import React from 'react';
import { DefaultThemeProps, Box, H3 } from '@deity/falcon-ui';
import { FixCenteredLayout } from '.';

const sidebarLayoutTheme: DefaultThemeProps = {
  sidebarLayout: {
    display: 'grid',
    gridRowGap: 'md'
  }
};

export const SidebarLayout: React.SFC<{ title?: string }> = ({ title, children }) => (
  <Box defaultTheme={sidebarLayoutTheme}>
    {title && <H3>{title}</H3>}
    <FixCenteredLayout maxWidth="70%">{children}</FixCenteredLayout>
  </Box>
);
