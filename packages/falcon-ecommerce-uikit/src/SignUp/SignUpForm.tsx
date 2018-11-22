import React from 'react';
import { Formik, Form } from 'formik';
import { Icon, Button } from '@deity/falcon-ui';
import { SignUpMutation, SignUpVariables } from './SignUpMutation';
import { Field } from './Field';

export const SignUpForm = () => (
  <SignUpMutation>
    {signUp => (
      <Formik
        initialValues={{} as SignUpVariables}
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
            <Field labeli18n="First name" type="string" name="firstname" autoComplete="given-name" />
            <Field type="string" name="lastname" autoComplete="family-name" />
            <Field type="email" name="email" autoComplete="email" />
            <Field type="password" name="password" autoComplete="off" />
            <Field type="password" name="passwordConfirmation" autoComplete="off" />
            <Button type="submit" css={{ width: '100%' }}>
              Create an account
              <Icon src="buttonArrowRight" stroke="white" />
            </Button>
          </Form>
        )}
      </Formik>
    )}
  </SignUpMutation>
);
