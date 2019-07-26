import React from 'react';
import { Form as FormikForm, FormikFormProps } from 'formik';
import { themed, Box } from '@deity/falcon-ui';
import { FormContext } from '@deity/falcon-front-kit';

const FormInnerDOM: React.SFC<FormProps> = props => {
  const { i18nId, ...restProps } = props;

  return (
    <FormContext.Provider value={{ id: props.id, name: props.name, i18nId }}>
      <Box as={FormikForm as any} {...restProps} />
    </FormContext.Provider>
  );
};

export type FormProps = {
  id: string;
  name?: string;
  i18nId?: string;
} & FormikFormProps;

export const Form = themed<FormProps, {}>({
  tag: FormInnerDOM,
  defaultTheme: {
    form: {
      display: 'grid',
      gridGap: 'sm'
    }
  }
});
