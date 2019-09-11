import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Box, H1, Divider } from '@deity/falcon-ui';
import { PageLayout, SignInForm, NewAccount } from '@deity/falcon-ui-kit';
import { OpenSidebarMutation } from 'src/components/Sidebar';

const SignIn = ({ history, location }) => {
  const { search } = location;

  const queryParams = new URLSearchParams(search);
  const next = queryParams.get('next') || '/';

  return (
    <PageLayout>
      <H1>
        <T id="signIn.title" />
      </H1>
      <OpenSidebarMutation>
        {openSidebar => (
          <Box>
            <SignInForm
              id="sign-in-page"
              onSuccess={() => history.replace(next)}
              onForgotPassword={() => openSidebar({ variables: { contentType: 'forgotPassword' } })}
            />
            <Divider my="lg" />
            <NewAccount onCreateNewAccount={() => openSidebar({ variables: { contentType: 'signUp' } })} />
          </Box>
        )}
      </OpenSidebarMutation>
    </PageLayout>
  );
};

export default SignIn;
