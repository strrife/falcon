import React from 'react';
import { Formik } from 'formik';
import { Text, GridLayout, H2 } from '@deity/falcon-ui';
import { FormField, Form, FormSubmit, FormErrorSummary } from '../Forms';
import { ResetCustomerPasswordMutation } from './AccountRecoveryMutations';
import { ValidatePasswordTokenQuery } from './AccountRecoveryQueries';

type ResetPasswordProps = {
  customerId: number;
  resetToken: string;
};
export const ResetPassword: React.SFC<ResetPasswordProps> = ({ customerId, resetToken }) => (
  <ValidatePasswordTokenQuery variables={{ id: customerId, token: resetToken }}>
    {({ validatePasswordToken }) => (
      <GridLayout>
        <H2>Reset Password</H2>
        <div>The reset password token you provided is invalid or has expired</div>
        <div>Request another one</div>
        <div> {JSON.stringify(validatePasswordToken)}</div>
      </GridLayout>
    )}
  </ValidatePasswordTokenQuery>
);
