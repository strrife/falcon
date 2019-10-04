import React from 'react';
import { ErrorModel } from '@deity/falcon-data';
import { Text, themed } from '@deity/falcon-ui';

export type ErrorProps = ErrorModel;
export const Error = themed<ErrorProps, any>({
  tag: Text,
  defaultTheme: {
    error: {
      color: 'error'
    }
  }
});
