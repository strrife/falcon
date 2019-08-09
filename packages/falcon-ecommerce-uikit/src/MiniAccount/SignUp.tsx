import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { OpenSidebarMutation, SidebarLayout, SignUpForm } from '@deity/falcon-ui-kit';

export const SignUp = () => (
  <I18n>
    {t => (
      <SidebarLayout title={t('signUp.title')}>
        <OpenSidebarMutation>
          {openSidebarMutation => (
            <SignUpForm onSubmit={() => openSidebarMutation({ variables: { contentType: 'account' } })} />
          )}
        </OpenSidebarMutation>
      </SidebarLayout>
    )}
  </I18n>
);
