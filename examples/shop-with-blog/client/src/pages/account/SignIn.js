import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, H1 } from '@deity/falcon-ui';
import { SignInForm } from '@deity/falcon-ecommerce-uikit';

const SignIn = ({ history, location: { state } }) => (
  <Box>
    <H1>
      <T id="signIn.title" />
    </H1>
    <SignInForm
      id="sign-in-page"
      onCompleted={() => {
        if (state && state.origin) {
          history.replace(state.origin);
        } else {
          history.push('/');
        }
      }}
    />
  </Box>
);

export default SignIn;
