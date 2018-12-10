import React from 'react';
import { I18n } from '@deity/falcon-i18n';
import { ForgotPasswordForm } from '../AccountRecovery';
import { MiniFormLayout } from './MiniFormLayout';

export const ForgotPassword = () => (
  <I18n>
    {t => (
      <MiniFormLayout title={t('forgotPassword.title')}>
        <ForgotPasswordForm />
      </MiniFormLayout>
    )}
  </I18n>
);
