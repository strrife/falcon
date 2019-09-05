import React from 'react';
import { Button, FlexLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { SignInFormProvider } from '@deity/falcon-front-kit';
import { FormField, Form, FormProps, PasswordRevealInput, FormErrorSummary } from '../Forms';
import { ForgotPasswordTrigger } from './ForgotPasswordTrigger';

export type SignInFormProps = Partial<FormProps> & {
  onSubmit?: () => void;
};

export const SignInForm: React.SFC<SignInFormProps> = ({ onSubmit, ...formProps }) => (
  <SignInFormProvider onSubmit={onSubmit}>
    {({ isSubmitting, status }) => (
      <Form i18nId="signIn" {...formProps}>
        <FormField name="email" type="email" required autoComplete="email" />
        <FormField
          name="password"
          type="password"
          // pass empty array, so default password strength validator does not get triggered
          validate={[]}
          required
          autoComplete="current-password"
        >
          {({ field }) => <PasswordRevealInput {...field} />}
        </FormField>
        <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
          <ForgotPasswordTrigger />
          <Button type="submit" variant={isSubmitting ? 'loader' : undefined}>
            <T id="signIn.button" />
          </Button>
        </FlexLayout>

        <FormErrorSummary errors={status && status.error} />
      </Form>
    )}
  </SignInFormProvider>
);
