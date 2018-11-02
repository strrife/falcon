import React from 'react';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Formik, Form, ErrorMessage, FormikProps } from 'formik';
import { adopt } from 'react-adopt';
import { H2, Icon, Box, Link, Button, Input, Label, Text } from '@deity/falcon-ui';
import { SignInMutation } from './SignInMutation';

export type SignInFormRenderProps = {
  signIn: { execute: MutationFn<any, OperationVariables>; result: MutationResult<any> };
  formik: FormikProps<any>;
};

export const SignInForm = adopt<SignInFormRenderProps>({
  signIn: ({ render }) => <SignInMutation>{(execute, result) => render && render({ execute, result })}</SignInMutation>,
  formik: ({ signIn, render }) => (
    <Formik
      initialValues={{}}
      onSubmit={(values: any) => {
        signIn.execute({
          variables: {
            input: {
              email: values.email,
              password: values.password
            }
          }
        });
      }}
    >
      {(...props) => <Form>{render && render(...props)}</Form>}
    </Formik>
  )
});

export const SignInFormContent: React.SFC<SignInFormRenderProps> = ({ formik: { handleChange, isSubmitting } }) => (
  <React.Fragment>
    <H2 mb="lg">Login</H2>
    <Text>Log in with your account</Text>
    <Box>
      <Label htmlFor="email">Email</Label>
      <Input name="email" onChange={handleChange} disabled={isSubmitting} />
    </Box>
    <Box>
      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" onChange={handleChange} disabled={isSubmitting} />
    </Box>
    <Link fontWeight="bold">Password forgot?</Link>
    <Button type="submit" width="100%" disabled={isSubmitting}>
      Login
      <Icon src="buttonArrowRight" stroke="white" />
    </Button>
  </React.Fragment>
);

export const SignIn: React.SFC = () => (
  <SignInForm>{(props: SignInFormRenderProps) => <SignInFormContent {...props} />}</SignInForm>
);
