import React from 'react';
import { Text } from '@deity/falcon-ui';
import { ResetPasswordFormProvider } from '@deity/falcon-front-kit';
import { FormField, Form, FormSubmit, FormProps, FormErrorSummary } from '../Forms';

export type ForgetPasswordFormProps = Partial<FormProps> & {
  onSubmit?: () => void;
};

export const ForgotPasswordForm: React.SFC<ForgetPasswordFormProps> = () => (
  <ResetPasswordFormProvider>
    {({ isSubmitting, status, values, submitCount }) => {
      const error = (status && status.error) || undefined;
      const submitSucceed = !isSubmitting && submitCount > 0 && !error;

      return (
        <Form id="forgot-password" i18nId="forgotPassword">
          <FormField name="email" required type="email" autoComplete="email" />
          <FormSubmit submitting={isSubmitting} value="Reset my password" />
          <FormErrorSummary errors={error} />

          {submitSucceed && (
            <Text mt="md" fontSize="md">
              If there is an account associated with <b>{values.email}</b> you will receive an email with a link to
              reset your password.
            </Text>
          )}
        </Form>
      );
    }}
  </ResetPasswordFormProvider>
);
