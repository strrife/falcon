import React from 'react';
import { Form as FormikForm } from 'formik';
import { DefaultThemeProps, ThemedComponentProps, Box } from '@deity/falcon-ui';

const formLayout: DefaultThemeProps = {
  formLayout: {
    display: 'grid',
    gridGap: 'sm'
  }
};

export const Form: React.SFC<ThemedComponentProps> = props => (
  <Box {...props} as={FormikForm as any} defaultTheme={formLayout} />
);
