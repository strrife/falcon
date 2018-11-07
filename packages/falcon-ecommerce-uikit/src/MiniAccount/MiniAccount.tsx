import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sidebar, Box, Backdrop, Portal, Icon, Link, List, ListItem, Button, Text, H2 } from '@deity/falcon-ui';
import { SidebarLayout } from '../SidebarLayout';
import { ToggleMiniAccountMutation, MiniAccountData } from '.';
import { SignInForm, SignInFormContent, SignInFormRenderProps } from './../SignIn';
import { SignOutMutation } from './../SignOut';
import { SignUpForm } from './../SignUp';

export const MiniAccount: React.SFC<MiniAccountData> = ({ miniAccount: { open }, customer }) => (
  <ToggleMiniAccountMutation>
    {toggle => (
      <React.Fragment>
        <Sidebar as={Portal} visible={open} side="right">
          <SidebarLayout>
            {customer ? (
              <Box>
                <Box>
                  <H2>{`${customer.firstname} ${customer.lastname}`}</H2>
                  <Text>{customer.email}</Text>
                  <SignOutMutation>
                    {(signOut, { loading }) => (
                      <Button css={{ width: '100%' }} mt="md" disabled={loading} onClick={() => signOut()}>
                        Logout
                        <Icon src="logOut" stroke="white" size="sm" ml="xs" />
                      </Button>
                    )}
                  </SignOutMutation>
                </Box>
                <List mt="lg">
                  <ListItem>
                    <Link as={RouterLink} to="/dashboard">
                      Dashboard
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={RouterLink} to="/personal-information">
                      Personal Information
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={RouterLink} to="/address-book">
                      Address Book
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={RouterLink} to="/orders">
                      Orders
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={RouterLink} to="/product-reviews">
                      Product Reviews
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={RouterLink} to="/wish-list">
                      Wish List
                    </Link>
                  </ListItem>
                </List>
              </Box>
            ) : (
              <Box>
                <SignInForm>{(props: SignInFormRenderProps) => <SignInFormContent {...props} />}</SignInForm>
                <SignUpForm />
              </Box>
            )}
            <Icon src="close" onClick={() => toggle()} position="absolute" top={15} right={30} />
          </SidebarLayout>
        </Sidebar>
        <Backdrop as={Portal} visible={open} onClick={() => toggle()} />
      </React.Fragment>
    )}
  </ToggleMiniAccountMutation>
);
