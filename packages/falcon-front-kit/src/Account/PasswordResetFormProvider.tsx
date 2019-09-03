import React from 'react';
import { Formik } from 'formik';
import { RequestPasswordResetInput } from '@deity/falcon-shop-extension';
import { RequestPasswordResetMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type ResetPasswordFormValues = RequestPasswordResetInput;
export type ResetPasswordFormProviderProps = FormProviderProps<ResetPasswordFormValues>;
export const ResetPasswordFormProvider: React.SFC<ResetPasswordFormProviderProps> = props => {
  const { onSuccess, initialValues, ...formikProps } = props;
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
                return onSuccess && onSuccess();
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
