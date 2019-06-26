import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { OpenSidebarMutation, SidebarLayout } from '@deity/falcon-ui-kit';
import { SignUpForm } from '../SignUp';

export const SignUp = () => (
  <I18n>
    {t => (
      <SidebarLayout title={t('signUp.title')}>
        <OpenSidebarMutation>
          {openSidebarMutation => (
            <SignUpForm onCompleted={() => openSidebarMutation({ variables: { contentType: 'account' } })} />
          )}
        </OpenSidebarMutation>
      </SidebarLayout>
    )}
  </I18n>
);
