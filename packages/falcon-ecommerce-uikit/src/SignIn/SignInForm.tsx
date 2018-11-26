import React from 'react';
import { Formik } from 'formik';
import { FormInput, Form, FormSubmit, FormErrorSummary } from '../Forms';
import { SignInMutation } from './SignInMutation';

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
            <FormInput label="Email" name="email" required type="email" autoComplete="email" />
            <FormInput
              label="Password"
              name="password"
              // pass empty array, so default password strength validator does not get triggered
              validators={[]}
              required
              type="password"
              autoComplete="current-password"
            />

            <FormSubmit submitting={loading} value=" Sign in" />
            <FormErrorSummary errors={error && [error.message]} />
          </Form>
        )}
      </Formik>
    )}
  </SignInMutation>
);
