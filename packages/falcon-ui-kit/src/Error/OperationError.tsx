import React from 'react';
import { ApolloError } from 'apollo-client';
import { apolloErrorToErrorModelList } from '@deity/falcon-data';
import { ListItem } from '@deity/falcon-ui';
import { ErrorListLayout } from './ErrorListLayout';
import { Error } from './Error';

export type OperationErrorProps = ApolloError;
export const OperationError: React.SFC<OperationErrorProps> = props => {
  const errors = apolloErrorToErrorModelList(props);

  if (!errors.length) {
    return null;
  }

  return (
    <ErrorListLayout>
      {errors.map(error => (
        <Error as={ListItem} key={error.message} insights={error}>
          {error.message}
        </Error>
      ))}
    </ErrorListLayout>
  );
};
