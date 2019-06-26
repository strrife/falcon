import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { ForgotPasswordForm, SidebarLayout } from '@deity/falcon-ui-kit';

export const ForgotPassword = () => (
  <I18n>
    {t => (
      <SidebarLayout title={t('forgotPassword.title')}>
        <ForgotPasswordForm />
      </SidebarLayout>
    )}
  </I18n>
);
