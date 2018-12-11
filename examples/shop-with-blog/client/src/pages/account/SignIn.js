import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, H1 } from '@deity/falcon-ui';
import { SignInForm } from '@deity/falcon-ecommerce-uikit';

const SignIn = () => (
  <Box>
    <H1>
      <T id="signIn.title" />
    </H1>
    <SignInForm id="sign-in-page" />
  </Box>
);

export default SignIn;
