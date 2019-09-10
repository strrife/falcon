import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, H1 } from '@deity/falcon-ui';
import { SignInForm } from '@deity/falcon-ui-kit';

const SignIn = ({ history, location }) => {
  const { search } = location;

  const queryParams = new URLSearchParams(search);
  const next = queryParams.get('next') || '/';

  return (
    <Box>
      <H1>
        <T id="signIn.title" />
      </H1>
      <SignInForm id="sign-in-page" onSuccess={() => history.replace(next)} />
    </Box>
  );
};

export default SignIn;
