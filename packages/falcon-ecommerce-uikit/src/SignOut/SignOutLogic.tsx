import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { adopt } from 'react-adopt';
import { Router } from './../Router';
import { SignOutMutation } from './SignOutMutation';

export type SignOutLogicRenderProps = {
  router: RouteComponentProps;
  signOutMutation: { signOut: MutationFn<any, OperationVariables>; result: MutationResult<any> };
};

export const SignOutLogic = adopt<SignOutLogicRenderProps>({
  router: ({ render }) => <Router>{(router: any) => render && render({ ...router })}</Router>,
  signOutMutation: ({ router, render }) => (
    <SignOutMutation
      update={(_cache, result) => {
        if (!result.errors && result.data.signOut) {
          router.history.push('/');
        }
      }}
    >
      {(signOut, result) => render && render({ signOut, result })}
    </SignOutMutation>
  )
});
