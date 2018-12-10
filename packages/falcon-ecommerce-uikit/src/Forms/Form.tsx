import React from 'react';
import { Form as FormikForm, FormikFormProps } from 'formik';
import { ThemedComponentProps, Box } from '@deity/falcon-ui';

export type FormContextValue = {
  id: number | string;
  name: string;
};

export const FormContext = React.createContext<FormContextValue>({
  id: '',
  name: ''
});

export type FormProps = { id?: number | string; name: string } & FormikFormProps & ThemedComponentProps;

export const Form: React.SFC<FormProps> = props => {
  const { id, name } = props;

  return (
    <FormContext.Provider value={{ id: id || name, name }}>
      <Box {...props} as={FormikForm as any} defaultTheme={{ formLayout: { display: 'grid', gridGap: 'sm' } }} />
    </FormContext.Provider>
  );
};
