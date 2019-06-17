import React from 'react';
import { MutationFn, OperationVariables, MutationResult } from 'react-apollo';
import { IsAuthenticatedQuery } from '@deity/falcon-shop-data';
import { Router } from '@deity/falcon-front-kit';
import { SignOutMutation } from './SignOutMutation';

export type SignOutLogicRenderProps = {
  isSignedIn: boolean;
  signOut: MutationFn<any, OperationVariables>;
  result: MutationResult<any>;
};

export const SignOutLogic = (props: { children: (renderProps: SignOutLogicRenderProps) => any }) => (
  <Router>
    {({ history }) => (
      <IsAuthenticatedQuery>
        {({ customer }) => (
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
      </IsAuthenticatedQuery>
    )}
  </Router>
);
