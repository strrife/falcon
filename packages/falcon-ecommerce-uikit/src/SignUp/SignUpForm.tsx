import React from 'react';
import { Formik } from 'formik';
import { SignUpMutation, SignUpVariables } from './SignUpMutation';
import { FormInput, Form, FormSubmit, FormErrorSummary } from '../Forms';

const validatePasswordMatch = (values: SignUpVariables) => {
  if (!values.password || !values.passwordConfirmation) return;
  if (values.password === values.passwordConfirmation) return;

  return {
    passwordConfirmation: 'Password confirmation does not match'
  };
};

type SignUpFormProps = {
  onCompleted?: () => void;
};

export const SignUpForm: React.SFC<SignUpFormProps> = ({ onCompleted }) => (
  <SignUpMutation onCompleted={onCompleted}>
    {(signUp, { loading, error }) => (
      <Formik
        // initial values need to be set because of: https://github.com/jaredpalmer/formik/issues/738
        initialValues={
          {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          } as SignUpVariables
        }
        validate={validatePasswordMatch}
        onSubmit={(values: SignUpVariables) => {
          signUp({
            variables: {
              input: {
                ...values,
                autoSignIn: true
              }
            }
          });
        }}
      >
        {() => (
          <Form>
            <FormInput label="First Name" type="text" required name="firstname" autoComplete="given-name" />
            <FormInput label="Last Name" type="text" required name="lastname" autoComplete="family-name" />
            <FormInput label="Email" type="email" required name="email" autoComplete="email" />
            <FormInput label="Password" type="password" required name="password" autoComplete="new-password" />
            <FormInput
              label="Confirm Password"
              type="password"
              required
              name="passwordConfirmation"
              autoComplete="new-password"
            />

            <FormSubmit submitting={loading} value="Create an account" />
            <FormErrorSummary errors={error && [error.message]} />
          </Form>
        )}
      </Formik>
    )}
  </SignUpMutation>
);
