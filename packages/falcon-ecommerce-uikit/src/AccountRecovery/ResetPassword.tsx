import React from 'react';
import { Formik } from 'formik';
import { Text, Button, GridLayout, H1, Box } from '@deity/falcon-ui';
import { FormField, Form, FormSubmit, FormErrorSummary, PasswordRevealInput } from '../Forms';
import { ResetCustomerPasswordMutation, ResetCustomerPasswordVariables } from './AccountRecoveryMutations';
import { ValidatePasswordTokenQuery } from './AccountRecoveryQueries';
import { OpenSidebarMutation } from '../Sidebar';
import { MiniFormLayout } from '../MiniAccount';

type ResetPasswordProps = {
  customerId: number;
  resetToken: string;
};
export const ResetPassword: React.SFC<ResetPasswordProps> = ({ customerId, resetToken }) => (
  <ValidatePasswordTokenQuery variables={{ id: customerId, token: resetToken }}>
    {({ validatePasswordToken }) => {
      const tokenIsInvalid = !validatePasswordToken;

      return (
        <GridLayout gridGap="md" py="md">
          <H1 justifySelf="center">Reset Password</H1>
          {tokenIsInvalid && <InvalidToken />}
          {!tokenIsInvalid && <ResetPasswordForm customerId={customerId} resetToken={resetToken} />}
        </GridLayout>
      );
    }}
  </ValidatePasswordTokenQuery>
);

export const InvalidToken: React.SFC = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <>
        <Text justifySelf="center" fontSize="md" color="error">
          The reset password token you provided is invalid or has expired.
        </Text>
        <Box justifySelf="center">
          <Button
            onClick={() =>
              openSidebar({
                variables: {
                  contentType: 'forgotPassword'
                }
              })
            }
          >
            Request another one
          </Button>
        </Box>
      </>
    )}
  </OpenSidebarMutation>
);

export const ResetPasswordForm: React.SFC<ResetPasswordProps> = ({ customerId, resetToken }) => (
  <ResetCustomerPasswordMutation>
    {(resetCustomerPassword, { loading, error, called }) => {
      const submitSucceed = called && !loading && !error;
      if (submitSucceed) {
        return <ResetPasswordSuccess />;
      }

      return (
        <Formik
          initialValues={
            {
              customerId,
              resetToken,
              password: ''
            } as ResetCustomerPasswordVariables
          }
          onSubmit={values =>
            resetCustomerPassword({
              variables: {
                input: values
              }
            })
          }
        >
          {() => (
            <MiniFormLayout>
              <Form>
                <FormField id="resetPasswordCustomerId" name="customerId" type="hidden" />
                <FormField id="resetPasswordResetToken" name="resetToken" type="hidden" />

                <FormField
                  id="resetPasswordPassword"
                  label="New Password"
                  name="password"
                  required
                  type="password"
                  autoComplete="new-password"
                >
                  {inputProps => <PasswordRevealInput {...inputProps} />}
                </FormField>

                <FormSubmit submitting={loading} value="Reset my password" />

                <FormErrorSummary errors={error && [error.message]} />
              </Form>
            </MiniFormLayout>
          )}
        </Formik>
      );
    }}
  </ResetCustomerPasswordMutation>
);

const ResetPasswordSuccess: React.SFC = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <>
        <Text justifySelf="center" fontSize="md">
          Your password has been reset successfully!
        </Text>
        <Box justifySelf="center">
          <Button
            onClick={() =>
              openSidebar({
                variables: {
                  contentType: 'account'
                }
              })
            }
          >
            Sign In
          </Button>
        </Box>
      </>
    )}
  </OpenSidebarMutation>
);
