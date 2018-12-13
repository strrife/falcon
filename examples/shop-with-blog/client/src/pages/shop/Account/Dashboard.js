import React from 'react';
import { Box, Icon, Button, H1 } from '@deity/falcon-ui';
import { SignOutMutation } from '@deity/falcon-ecommerce-uikit';

const Dashboard = () => (
  <Box>
    <H1>Dashboard</H1>
    <Box>
      <SignOutMutation>
        {(signOut, { loading }) => (
          <Button mt="md" disabled={loading} onClick={() => signOut()}>
            Logout
            <Icon
              src={loading ? 'loader' : 'logOut'}
              stroke="white"
              fill={loading ? 'white' : 'transparent'}
              size="md"
              ml="xs"
            />
          </Button>
        )}
      </SignOutMutation>
    </Box>
  </Box>
);

export default Dashboard;
