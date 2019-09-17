import React from 'react';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { Router } from '../Router';
import { IsAuthenticatedQuery } from '../Customer';
import { SignOutMutation } from './SignOutMutation';

export type SignOutLogicRenderProps = {
  isSignedIn: boolean;
  signOut: MutationFn<any, OperationVariables>;
  result: MutationResult<any>;
};

export const SignOutLogic = (props: { children: (renderProps: SignOutLogicRenderProps) => any }) => (
  <IsAuthenticatedQuery>
    {({ customer }) => (
      <Router>
        {({ history }) => (
          <SignOutMutation
            update={(_cache, result) => {
              if (!result.errors && result.data.signOut) {
                history.push('/');
              }
            }}
          >
            {(signOut, result) => props.children({ isSignedIn: !!customer, signOut, result })}
          </SignOutMutation>
        )}
      </Router>
    )}
  </IsAuthenticatedQuery>
);
