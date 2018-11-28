import React from 'react';
import { ForgotPasswordForm } from '../AccountRecovery';
import { MiniFormLayout } from './MiniFormLayout';

export const ForgotPassword = () => (
  <MiniFormLayout title="Forgot Password">
    <ForgotPasswordForm />
  </MiniFormLayout>
);
