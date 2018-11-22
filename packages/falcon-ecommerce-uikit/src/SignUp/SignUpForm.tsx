import React from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import { Box, Icon, List, ListItem, Button, Text } from '@deity/falcon-ui';
import { SignUpMutation, SignUpVariables } from './SignUpMutation';

export const SignUpForm = () => (
  <Box>
    <Text>No account yet?</Text>

    <Text fontWeight="bold"> Creating an account has many benefits: </Text>
    <SignUpMutation>
      {signUp => (
        <Formik
          initialValues={{} as SignUpVariables}
          onSubmit={(values: SignUpVariables) => {
            signUp({
              variables: {
                input: {
                  ...values,
                  autoSignIn: true
                }
              }
            });
          }}
        >
          {() => (
            <Form>
              <Field type="string" name="firstname" />
              <Field type="string" name="lastname" />
              <Field type="email" name="email" />
              <Field type="password" name="password" />
              <Field type="password" name="passwordConfirmation" />
              <Button type="submit" css={{ width: '100%' }}>
                Create an account
                <Icon src="buttonArrowRight" stroke="white" />
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </SignUpMutation>

    <List>
      <ListItem>check out faster</ListItem>
      <ListItem> keep more than one address </ListItem>
      <ListItem> track orders and more </ListItem>
    </List>
  </Box>
);
