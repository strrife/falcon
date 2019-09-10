import React from 'react';
import { themed, Box, H3 } from '@deity/falcon-ui';
import { FixCenteredLayout } from './FixCenteredLayout';

const SidebarLayoutInnerDOM: React.SFC<SidebarLayoutProps> = ({ title, children, ...rest }) => (
  <Box {...rest}>
    {title && <H3>{title}</H3>}
    <SidebarContentLayout>{children}</SidebarContentLayout>
  </Box>
);

export type SidebarLayoutProps = {
  title?: string;
};
export const SidebarLayout = themed<SidebarLayoutProps, any>({
  tag: SidebarLayoutInnerDOM,
  defaultTheme: {
    sidebarLayout: {
      display: 'grid',
      gridRowGap: 'md',
      gridTemplate: 'auto 1fr / 100%',
      css: {
        height: '100%'
      }
    }
  }
});

export const SidebarContentLayout = themed({
  tag: FixCenteredLayout,
  defaultTheme: {
    sidebarContentLayout: {
      css: {
        maxWidth: '70%'
      }
    }
  }
});
