import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Icon, Link, List, ListItem, Button, Text, H2 } from '@deity/falcon-ui';
import { MiniAccountData } from './MiniAccountQuery';
import { SignInForm, SignInFormContent, SignInFormRenderProps } from '../SignIn';
import { SignOutMutation } from '../SignOut';
import { OpenSidebarMutation } from '../Sidebar';

export const MiniAccount: React.SFC<MiniAccountData> = ({ customer }) =>
  customer ? (
    <Box>
      <Box>
        <H2>{`${customer.firstname} ${customer.lastname}`}</H2>
        <Text>{customer.email}</Text>
        <SignOutMutation>
          {(signOut, { loading }) => (
            <Button css={{ width: '100%' }} mt="md" disabled={loading} onClick={() => signOut()}>
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
      <OpenSidebarMutation>
        {openSidebar => (
          <Button
            onClick={() =>
              openSidebar({
                variables: {
                  contentType: 'signup'
                }
              })
            }
          >
            Sign up
          </Button>
        )}
      </OpenSidebarMutation>
    </Box>
  );
