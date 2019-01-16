import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, H1 } from '@deity/falcon-ui';
import { SignInForm } from '@deity/falcon-ecommerce-uikit';

const SignIn = ({ history, location }) => {
  const { search } = location;

  const queryParams = new URLSearchParams(search);
  const returnUrl = queryParams.get('returnUrl') || '/';

  return (
    <Box>
      <H1>
        <T id="signIn.title" />
      </H1>
      <SignInForm id="sign-in-page" onCompleted={() => history.replace(returnUrl)} />
    </Box>
  );
};

export default SignIn;
