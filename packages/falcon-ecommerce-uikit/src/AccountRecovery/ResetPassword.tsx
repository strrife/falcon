import React from 'react';
import { Formik } from 'formik';
import { Text, Button, GridLayout, H1, Link, FlexLayout, Box } from '@deity/falcon-ui';
import { FormField, Form, FormSubmit, FormErrorSummary } from '../Forms';
import { ResetCustomerPasswordMutation } from './AccountRecoveryMutations';
import { ValidatePasswordTokenQuery } from './AccountRecoveryQueries';
import { OpenSidebarMutation } from '../Sidebar';

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

// zrobić otwieranie sidebar'a jako komponent??
export const ResetPasswordForm: React.SFC = () => <div />;
