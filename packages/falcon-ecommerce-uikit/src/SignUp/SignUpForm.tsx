import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Box, DefaultThemeProps, Input } from '@deity/falcon-ui';
import { SignUpMutation, SignUpVariables } from './SignUpMutation';
import { FormInput } from '../FormInput';
import { OpenSidebarMutation } from '../Sidebar';

const signUpFormLayout: DefaultThemeProps = {
  signUpFormLayout: {
    display: 'grid',
    gridGap: 'sm'
  }
};

export const SignUpForm = () => (
  <OpenSidebarMutation>
    {openSidebarMutation => (
      <SignUpMutation
        onCompleted={() =>
          openSidebarMutation({
            variables: {
              contentType: 'signin'
            }
          })
        }
      >
        {(signUp, { loading }) => (
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
              <Box as={Form} defaultTheme={signUpFormLayout}>
                <Input />
                <FormInput label="First Name" type="text" required name="firstname" autoComplete="given-name" />
                <FormInput label="Last Name" type="text" required name="lastname" autoComplete="family-name" />
                <FormInput label="Email" type="email" required name="email" autoComplete="email" />
                <FormInput label="Password" type="password" required name="password" autoComplete="off" />
                <FormInput
                  label="Confirm Password"
                  type="password"
                  required
                  name="passwordConfirmation"
                  autoComplete="off"
                />
                <Box justifySelf="center">
                  <Button type="submit" variant={loading ? 'loader' : undefined}>
                    Create an account
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        )}
      </SignUpMutation>
    )}
  </OpenSidebarMutation>
);
