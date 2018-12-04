import React from 'react';
import { Formik } from 'formik';
import { Button, FlexLayout } from '@deity/falcon-ui';

import { FormField, Form, PasswordRevealInput, FormErrorSummary } from '../Forms';
import { SignInMutation } from './SignInMutation';
import { ForgotPasswordTrigger } from './ForgotPasswordTrigger';

type SignInFormProps = {
  onCompleted?: () => void;
};

export const SignInForm: React.SFC<SignInFormProps> = ({ onCompleted }) => (
  <SignInMutation onCompleted={onCompleted}>
    {(signIn, { loading, error }) => (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={values =>
          signIn({
            variables: {
              input: {
                email: values.email,
                password: values.password
              }
            }
          })
        }
      >
        {() => (
          <Form>
            <FormField id="signInEmail" label="Email" name="email" required type="email" autoComplete="email" />
            <FormField
              id="signInPassword"
              label="Password"
              name="password"
              // pass empty array, so default password strength validator does not get triggered
              validators={[]}
              required
              type="password"
              autoComplete="current-password"
            >
              {inputProps => <PasswordRevealInput {...inputProps} />}
            </FormField>
            <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
              <ForgotPasswordTrigger />
              <Button type="submit" variant={loading ? 'loader' : undefined}>
                Sign in
              </Button>
            </FlexLayout>

            <FormErrorSummary errors={error && [error.message]} />
          </Form>
        )}
      </Formik>
    )}
  </SignInMutation>
);
