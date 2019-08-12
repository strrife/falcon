import React from 'react';
import { Formik } from 'formik';
import { SignInMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type SignInFormValues = {
  email: string;
  password: string;
};
export const SignInFormProvider: React.SFC<FormProviderProps<SignInFormValues>> = props => {
  const { onSubmit, initialValues, ...formikProps } = props;
  const defaultInitialValues = {
    email: '',
    password: ''
  };

  return (
    <SignInMutation>
      {signIn => (
        <Formik
          initialValues={initialValues || defaultInitialValues}
          onSubmit={(values, formikActions) =>
            signIn({ variables: { input: values } })
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
    </SignInMutation>
  );
};
