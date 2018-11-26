import React from 'react';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Formik, Form, FormikProps } from 'formik';
import { adopt } from 'react-adopt';
import { Box, Button, Text, DefaultThemeProps } from '@deity/falcon-ui';
import { SignInMutation } from './SignInMutation';
import { FormInput } from '../Forms';

export type SignInFormRenderProps = {
  signIn: { execute: MutationFn<any, OperationVariables>; result: MutationResult<any> };
  formik: FormikProps<any>;
};

const signInFormLayout: DefaultThemeProps = {
  signInFormLayout: {
    display: 'grid',
    gridGap: 'sm'
  }
};

export const SignInForm = adopt<SignInFormRenderProps>({
  signIn: ({ render }) => <SignInMutation>{(execute, result) => render && render({ execute, result })}</SignInMutation>,
  formik: ({ signIn, render }) => (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values: any) =>
        signIn.execute({
          variables: {
            input: {
              email: values.email,
              password: values.password
            }
          }
        })
      }
    >
      {(...props) => <Form>{render && render(...props)}</Form>}
    </Formik>
  )
});

export const SignInFormContent: React.SFC<SignInFormRenderProps> = ({
  signIn: {
    result: { error, loading }
  }
}) => (
  <Box defaultTheme={signInFormLayout}>
    <Box>{!!error && <Text color="error">{error.message}</Text>}</Box>
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

    <Box justifySelf="end" mt="md">
      <Button type="submit" variant={loading ? 'loader' : undefined}>
        Sign in
      </Button>
    </Box>
  </Box>
);

export const SignIn: React.SFC = () => (
  <SignInForm>{(props: SignInFormRenderProps) => <SignInFormContent {...props} />}</SignInForm>
);
