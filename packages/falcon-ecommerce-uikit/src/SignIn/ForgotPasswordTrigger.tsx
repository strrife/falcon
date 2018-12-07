import React from 'react';
import { Link } from '@deity/falcon-ui';
import { OpenSidebarMutation } from '../Sidebar';

export const ForgotPasswordTrigger: React.SFC = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <Link
        fontSize="xs"
        onClick={() =>
          openSidebar({
            variables: {
              contentType: 'forgotPassword'
            }
          })
        }
      >
        Forgot password?
      </Link>
    )}
  </OpenSidebarMutation>
);
