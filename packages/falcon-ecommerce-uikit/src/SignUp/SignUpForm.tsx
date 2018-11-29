import React from 'react';
import { Formik } from 'formik';
import { SignUpMutation, SignUpVariables } from './SignUpMutation';
import { FormField, Form, FormSubmit, FormErrorSummary, PasswordRevealInput } from '../Forms';

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
            password: ''
          } as SignUpVariables
        }
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
            <FormField label="First Name" type="text" required name="firstname" autoComplete="given-name" />
            <FormField label="Last Name" type="text" required name="lastname" autoComplete="family-name" />
            <FormField label="Email" type="email" required name="email" autoComplete="email" />

            <FormField
              label="Password"
              required
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
            >
              {inputProps => <PasswordRevealInput {...inputProps} />}
            </FormField>

            <FormSubmit submitting={loading} value="Create an account" />
            <FormErrorSummary errors={error && [error.message]} />
          </Form>
        )}
      </Formik>
    )}
  </SignUpMutation>
);
