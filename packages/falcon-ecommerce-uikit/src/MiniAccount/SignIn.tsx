import React from 'react';
import { Divider } from '@deity/falcon-ui';
import { NewAccount, CloseSidebarMutation, SidebarLayout, SignInForm } from '@deity/falcon-ui-kit';
import { I18n } from '@deity/falcon-i18n';

export const SignIn = () => (
  <I18n>
    {t => (
      <SidebarLayout title={t('signIn.title')}>
        <CloseSidebarMutation>
          {closeSidebar => <SignInForm id="sign-in-sidebar" onSubmit={closeSidebar} />}
        </CloseSidebarMutation>
        <Divider my="lg" />
        <NewAccount />
      </SidebarLayout>
    )}
  </I18n>
);
