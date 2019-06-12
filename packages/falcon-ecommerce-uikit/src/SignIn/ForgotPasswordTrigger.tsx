import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Link } from '@deity/falcon-ui';
import { OpenSidebarMutation } from '@deity/falcon-uikit';

export const ForgotPasswordTrigger: React.SFC = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <Link fontSize="xs" onClick={() => openSidebar({ variables: { contentType: 'forgotPassword' } })}>
        <T id="signIn.forgotPasswordQuestion" />
      </Link>
    )}
  </OpenSidebarMutation>
);
