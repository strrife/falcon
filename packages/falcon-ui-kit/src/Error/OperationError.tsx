import React from 'react';
import { ApolloError } from 'apollo-client';
import { ErrorModel, apolloErrorToErrorModelList } from '@deity/falcon-data';
import { ListItem } from '@deity/falcon-ui';
import { ErrorListLayout } from './ErrorListLayout';
import { Error } from './Error';

export type OperationErrorProps = ApolloError;
export const OperationError: React.SFC<OperationErrorProps> = props => {
  const errors = apolloErrorToErrorModelList(props);

  if (!errors.length) {
    return null;
  }

  const errorInsights = ({ message, ...rest }: ErrorModel) => {
    if (process.env.NODE_ENV !== 'production') {
      return JSON.stringify({ ...rest }, null, 2);
    }
    return '';
  };

  return (
    <ErrorListLayout>
      {errors.map(error => (
        <Error as={ListItem} key={error.message} title={errorInsights(error)}>
          {error.message}
        </Error>
      ))}
    </ErrorListLayout>
  );
};
