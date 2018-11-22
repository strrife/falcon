import React from 'react';
import { Box, List, ListItem, Text } from '@deity/falcon-ui';
import { SignUpForm } from '../SignUp';

export const SignUp = () => (
  <Box>
    <Text>No account yet?</Text>

    <Text fontWeight="bold"> Creating an account has many benefits: </Text>
    <SignUpForm />

    <List>
      <ListItem>check out faster</ListItem>
      <ListItem> keep more than one address </ListItem>
      <ListItem> track orders and more </ListItem>
    </List>
  </Box>
);
