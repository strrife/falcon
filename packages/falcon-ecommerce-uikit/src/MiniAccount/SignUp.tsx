import React from 'react';
import { OpenSidebarMutation } from '../Sidebar';
import { SignUpForm } from '../SignUp';
import { MiniFormLayout } from './MiniFormLayout';

export const SignUp = () => (
  <MiniFormLayout title="Register">
    <OpenSidebarMutation>
      {openSidebarMutation => (
        <SignUpForm
          onCompleted={() =>
            openSidebarMutation({
              variables: {
                contentType: 'account'
              }
            })
          }
        />
      )}
    </OpenSidebarMutation>
  </MiniFormLayout>
);
