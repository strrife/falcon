import React from 'react';
import { Formik } from 'formik';
import { SignUpMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type SignUpFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  autoSignIn: boolean;
};
export const SignUpFormProvider: React.SFC<FormProviderProps<SignUpFormValues>> = props => {
  const { onSubmit, initialValues, ...formikProps } = props;
  const defaultInitialValues: SignUpFormValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    autoSignIn: true
  };

  return (
    <SignUpMutation>
      {signUp => (
        <Formik
          initialValues={initialValues || defaultInitialValues}
          onSubmit={(values, formikActions) =>
            signUp({ variables: { input: values } })
              .then(() => {
                formikActions.setSubmitting(false);
                return onSubmit && onSubmit();
              })
              .catch(e => {
                formikActions.setSubmitting(false);
                formikActions.setError(e.message);
              })
          }
          {...formikProps}
        />
      )}
    </SignUpMutation>
  );
};
