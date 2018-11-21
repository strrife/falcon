import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@deity/falcon-ecommerce-uikit';
import { Sidebar as SidebarLayout, Portal, Backdrop, Icon, Box } from '@deity/falcon-ui';

export const Sidebar = ({ ready, close, open, side, children }) => (
  <React.Fragment>
    <SidebarLayout as={Portal} visible={open} side={side}>
      <Box position="relative" flex={1}>
        <Icon src="close" stroke="black" position="absolute" right={0} top={0} onClick={close} />
        {ready ? children() : <Loader />}
      </Box>
    </SidebarLayout>
    <Backdrop as={Portal} visible={open} onClick={close} />
  </React.Fragment>
);

Sidebar.propTypes = {
  ready: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  side: PropTypes.oneOf(['right', 'left']).isRequired
};
