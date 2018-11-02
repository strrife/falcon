import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Sidebar, Box, Backdrop, Portal, Icon, Link, List, ListItem, Button, Text, H2 } from '@deity/falcon-ui';
import { MiniSignInData } from './../SignIn';
import { ToggleMiniSignInMutation } from './../SignIn/MiniSignInMutation';
import { SignInForm, SignInFormContent, SignInFormRenderProps } from './../SignIn';

import { SidebarLayout } from '../SidebarLayout';
import { CustomerQuery } from './../Customer';

export const MiniLogin: React.SFC<MiniSignInData> = ({ miniSignIn: { open } }) => (
  <ToggleMiniSignInMutation>
    {toggle => (
      <React.Fragment>
        <Sidebar as={Portal} visible={open} side="right">
          <SidebarLayout>
            <CustomerQuery>
              {(data: any) => {
                const d = 1;

                return data.customer ? (
                  <Box>
                    <Box>
                      <H2>{`${data.customer.firstname} ${data.customer.lastname}`}</H2>
                      <Text>{data.customer.email}</Text>
                      <Button width="100%" mt="md" /* disabled={isSubmitting} */>
                        Logout
                        <Icon src="logOut" stroke="white" size={13} ml="xs" />
                      </Button>
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
                    <p>{JSON.stringify(data.customer, null, 2)}</p>
                  </Box>
                ) : (
                  <React.Fragment>
                    <SignInForm>{(props: SignInFormRenderProps) => <SignInFormContent {...props} />}</SignInForm>
                    <Text>No account yet?</Text>
                    <Button type="submit" width="100%">
                      Create an account
                      <Icon src="buttonArrowRight" stroke="white" />
                    </Button>
                    <Text fontWeight="bold">Creating an account has many benefits: </Text>
                    <List>
                      <ListItem>check out faster</ListItem>
                      <ListItem>keep more than one address</ListItem>
                      <ListItem>track orders and more</ListItem>
                    </List>
                  </React.Fragment>
                );
              }}
            </CustomerQuery>
            <Icon src="close" onClick={() => toggle()} position="absolute" top={15} right={30} />
          </SidebarLayout>
        </Sidebar>
        <Backdrop as={Portal} visible={open} onClick={() => toggle()} />
      </React.Fragment>
    )}
  </ToggleMiniSignInMutation>
);
