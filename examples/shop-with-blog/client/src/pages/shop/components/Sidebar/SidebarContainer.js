import React from 'react';
import PropTypes from 'prop-types';
import { EnsureTTI } from '@deity/falcon-front-kit';
import { CloseSidebarMutation } from '@deity/falcon-ui-kit';
import { SidebarQuery } from './SidebarQuery';

export const SidebarContainer = ({ children }) => (
  <EnsureTTI>
    {({ isReady, forceReady }) => (
      <SidebarQuery onCompleted={({ sidebar }) => sidebar.isOpen && forceReady()}>
        {({ sidebar }) => (
          <CloseSidebarMutation>
            {closeSidebar =>
              isReady
                ? children({
                    side: sidebar.side,
                    isOpen: sidebar.isOpen,
                    contentType: sidebar.contentType,
                    close: closeSidebar
                  })
                : null
            }
          </CloseSidebarMutation>
        )}
      </SidebarQuery>
    )}
  </EnsureTTI>
);

SidebarContainer.propTypes = {
  children: PropTypes.func.isRequired
};
