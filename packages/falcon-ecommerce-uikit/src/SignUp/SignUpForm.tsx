import React from 'react';
import { Box, Icon, List, ListItem, Button, Text } from '@deity/falcon-ui';

export const SignUpForm = () => (
  <Box>
    <Text>No account yet?</Text>
    <Button type="submit" css={{ width: '100%' }}>
      Create an account
      <Icon src="buttonArrowRight" stroke="white" />
    </Button>
    <Text fontWeight="bold"> Creating an account has many benefits: </Text>

    <List>
      <ListItem>check out faster</ListItem>
      <ListItem> keep more than one address </ListItem>
      <ListItem> track orders and more </ListItem>
    </List>
  </Box>
);
