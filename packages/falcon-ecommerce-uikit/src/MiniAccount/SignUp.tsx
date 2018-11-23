import React from 'react';
import { Box, H3, DefaultThemeProps } from '@deity/falcon-ui';
import { SignUpForm } from '../SignUp';

const signUpLayout: DefaultThemeProps = {
  signUpLayout: {
    display: 'grid',
    gridRowGap: 'md'
  }
};

export const SignUp = () => (
  <Box defaultTheme={signUpLayout}>
    <H3>Register</H3>
    <Box
      css={{
        maxWidth: 340,
        width: '100%',
        margin: '0 auto'
      }}
    >
      <SignUpForm />
    </Box>
  </Box>
);
