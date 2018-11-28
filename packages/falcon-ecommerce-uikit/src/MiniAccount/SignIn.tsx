import React from 'react';
import { Divider, H4, Text, List, ListItem, Icon, Button, GridLayout } from '@deity/falcon-ui';
import { SignInForm } from '../SignIn';
import { MiniFormLayout } from './MiniFormLayout';
import { OpenSidebarMutation } from '../Sidebar';

export const SignIn = () => (
  <MiniFormLayout title="Sign In">
    <SignInForm />

    <Divider my="lg" />
    <GridLayout>
      <H4 mb="xs">New Customers</H4>

      <Text>Creating an account has many benefits:</Text>

      <List>
        <ListItem display="flex" mb="sm">
          <Icon src="check" size="md" mr="xs" stroke="primaryLight" />
          check out faster
        </ListItem>
        <ListItem display="flex" mb="sm">
          <Icon src="check" size="md" mr="xs" stroke="primaryLight" />
          keep more than one address
        </ListItem>
        <ListItem display="flex" mb="sm">
          <Icon src="check" size="md" mr="xs" stroke="primaryLight" />
          track orders and more
        </ListItem>
      </List>

      <OpenSidebarMutation>
        {openSidebar => (
          <Button
            justifySelf="end"
            variant="secondary"
            onClick={() =>
              openSidebar({
                variables: {
                  contentType: 'signUp'
                }
              })
            }
          >
            Create an account
          </Button>
        )}
      </OpenSidebarMutation>
    </GridLayout>
  </MiniFormLayout>
);
