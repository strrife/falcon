import React from 'react';
import { Formik } from 'formik';
import { RequestPasswordResetInput } from '@deity/falcon-shop-extension';
import { RequestPasswordResetMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type ResetPasswordFormValues = RequestPasswordResetInput;

export const ResetPasswordFormProvider: React.SFC<FormProviderProps<ResetPasswordFormValues>> = props => {
  const { onSubmit, initialValues, ...formikProps } = props;
  const defaultInitialValues: ResetPasswordFormValues = {
    email: ''
  };

  return (
    <RequestPasswordResetMutation>
      {requestPasswordReset => (
        <Formik
          initialValues={defaultInitialValues || initialValues}
          onSubmit={(values, formikActions) =>
            requestPasswordReset({ variables: { input: values } })
              .then(() => {
                formikActions.setSubmitting(false);
                return onSubmit && onSubmit();
              })
              .catch(e => {
                formikActions.setSubmitting(false);
                formikActions.setStatus({ error: e.message });
              })
          }
          {...formikProps}
        />
      )}
    </RequestPasswordResetMutation>
  );
};
