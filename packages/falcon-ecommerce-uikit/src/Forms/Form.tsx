import React from 'react';
import { Form as FormikForm, FormikFormProps } from 'formik';
import { ThemedComponentProps, Box } from '@deity/falcon-ui';

export type FormContextValue = {
  id: number | string;
  name?: string;
  i18nId?: string;
};

export const FormContext = React.createContext<FormContextValue>({} as any);

export type FormProps = { id: number | string; name?: string; i18nId?: string } & FormikFormProps &
  ThemedComponentProps;

export const Form: React.SFC<FormProps> = props => {
  const { id, name, i18nId } = props;

  return (
    <FormContext.Provider value={{ id, name, i18nId }}>
      <Box {...props} as={FormikForm as any} defaultTheme={{ formLayout: { display: 'grid', gridGap: 'sm' } }} />
    </FormContext.Provider>
  );
};
