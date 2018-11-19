import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Formik, Form, FormikProps } from 'formik';
import { adopt } from 'react-adopt';
import { H2, Icon, Box, Link, Button, Input, Label, Text } from '@deity/falcon-ui';
import { Router } from './../Router';
import { SignInMutation } from './SignInMutation';

export type SignInFormRenderProps = {
  router: RouteComponentProps;
  signInMutation: { signIn: MutationFn<any, OperationVariables>; result: MutationResult<any> };
  formik: FormikProps<any>;
};

export const SignInForm = adopt<SignInFormRenderProps>({
  router: ({ render }) => <Router>{(router: any) => render && render({ ...router })}</Router>,
  signInMutation: ({ render }) => (
    <SignInMutation>{(signIn, result) => render && render({ signIn, result })}</SignInMutation>
  ),
  formik: ({ signInMutation, router, render }) => (
    <Formik
      initialValues={{}}
      onSubmit={(values: any) =>
        signInMutation
          .signIn({
            variables: {
              input: {
                email: values.email,
                password: values.password
              }
            }
          })
          .then(() => {
            const { location, history } = router;
            const { state } = location;

            history.replace(state && state.origin ? state.origin : '/', state);
          })
      }
    >
      {(...props) => <Form>{render && render(...props)}</Form>}
    </Formik>
  )
});

export const SignInFormContent: React.SFC<SignInFormRenderProps> = ({
  formik: { handleChange },
  signInMutation: {
    result: { error, loading }
  }
}) => (
  <React.Fragment>
    <H2 mb="lg">Login</H2>
    <Text>Log in with your account</Text>
    <Box>{!!error && <Text color="error">{error.message}</Text>}</Box>
    <Box>
      <Label htmlFor="email">Email</Label>
      <Input name="email" onChange={handleChange} disabled={loading} />
    </Box>
    <Box>
      <Label htmlFor="password">Password</Label>
      <Input name="password" type="password" onChange={handleChange} disabled={loading} />
    </Box>
    <Link fontWeight="bold">Password forgot?</Link>
    <Button type="submit" disabled={loading} css={{ width: '100%' }}>
      Login
      <Icon
        src={loading ? 'loader' : 'buttonArrowRight'}
        stroke="white"
        fill={loading ? 'white' : 'transparent'}
        size="md"
        ml="xs"
      />
    </Button>
  </React.Fragment>
);

export const SignIn: React.SFC = () => (
  <SignInForm>{(props: SignInFormRenderProps) => <SignInFormContent {...props} />}</SignInForm>
);
