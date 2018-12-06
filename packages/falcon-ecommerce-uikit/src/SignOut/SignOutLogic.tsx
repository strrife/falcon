import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Router } from './../Router';
import { SignOutMutation } from './SignOutMutation';

export type SignOutLogicRenderProps = {
  router: RouteComponentProps;
  signOutMutation: { signOut: MutationFn<any, OperationVariables>; result: MutationResult<any> };
};

export const SignOutLogic = (props: { children: any }) => (
  <Router>
    {({ history }) => (
      <SignOutMutation
        update={(_cache, result) => {
          if (!result.errors && result.data.signOut) {
            history.push('/');
          }
        }}
      >
        {(signOut, result) => props.children({ signOut, result })}
      </SignOutMutation>
    )}
  </Router>
);
