import React from 'react';
import { MutationFn, MutationResult } from 'react-apollo';
import { SignOutMutation, SignOutResponse, IsAuthenticatedQuery } from '@deity/falcon-shop-data';

export type SignOutProviderRenderProps = {
  isSignedIn: boolean;
  signOut: MutationFn<SignOutResponse, {}>;
  result: MutationResult<SignOutResponse>;
};

export type SignOutProviderProps = {
  children: (renderProps: SignOutProviderRenderProps) => any;
};
export const SignOutProvider: React.SFC<SignOutProviderProps> = ({ children }) => (
  <IsAuthenticatedQuery>
    {({ customer }) => (
      <SignOutMutation>{(signOut, result) => children({ isSignedIn: !!customer, signOut, result })}</SignOutMutation>
    )}
  </IsAuthenticatedQuery>
);
