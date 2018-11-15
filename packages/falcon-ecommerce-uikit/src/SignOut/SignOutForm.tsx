import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Formik, Form, FormikProps } from 'formik';
import { adopt } from 'react-adopt';
// import { H2, Icon, Box, Link, Button, Input, Label, Text } from '@deity/falcon-ui';
import { Router } from './../Router';
import { SignOutMutation } from './SignOutMutation';

export type SignOutFormRenderProps = {
  router: RouteComponentProps;
  signOut: { execute: MutationFn<any, OperationVariables>; result: MutationResult<any> };
  formik: FormikProps<any>;
};

export const SignOutForm = adopt<SignOutFormRenderProps>({
  router: ({ render }) => <Router>{(router: any) => render && render({ ...router })}</Router>,
  signOut: ({ render }) => (
    <SignOutMutation>{(execute, result) => render && render({ execute, result })}</SignOutMutation>
  ),
  // eslint-disable-next-line
  formik: ({ signOut, router, render }: { signOut: any; router: RouteComponentProps<any>; render: Function }) => (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        // eslint-disable-next-line
        debugger;
        return signOut.execute().then(() => {
          // eslint-disable-next-line
          debugger;
          router.history.push('/');
        });
      }}
    >
      {(...props) => <Form>{render && render(...props)}</Form>}
    </Formik>
  )
});
