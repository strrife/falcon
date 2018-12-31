import React from 'react';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Box, FlexLayout, GridLayout, Button } from '@deity/falcon-ui';
import {
  FormField,
  Form,
  FormErrorSummary,
  ChangePasswordMutation,
  TwoColumnsLayout,
  TwoColumnsLayoutArea
} from '@deity/falcon-ecommerce-uikit';

const ChangePassword = ({ history }) => (
  <Box>
    <H1>
      <T id="changePassword.title" />
    </H1>
    <TwoColumnsLayout mt="lg">
      <ChangePasswordMutation>
        {(changePassword, { loading, error }) => (
          <Formik
            initialValues={{ currentPassword: '', password: '' }}
            onSubmit={values =>
              changePassword({
                variables: {
                  input: {
                    currentPassword: values.currentPassword,
                    password: values.password
                  }
                }
              }).then(() => history.push('/account'))
            }
          >
            {() => (
              <GridLayout as={Form} id="change-password" i18nId="changePassword" gridArea={TwoColumnsLayoutArea.left}>
                <FormField name="currentPassword" />
                <FormField name="password" />
                <FlexLayout justifyContent="flex-end" alignItems="center" mt="md">
                  <Button type="submit" variant={loading ? 'loader' : undefined}>
                    <T id="changePassword.submitButton" />
                  </Button>
                </FlexLayout>
                <FormErrorSummary errors={error && [error.message]} />
              </GridLayout>
            )}
          </Formik>
        )}
      </ChangePasswordMutation>
    </TwoColumnsLayout>
  </Box>
);

export default ChangePassword;
