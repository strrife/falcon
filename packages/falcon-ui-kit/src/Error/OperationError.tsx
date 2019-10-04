import React from 'react';
import { ApolloError } from 'apollo-client';
import { ErrorModel, apolloErrorToErrorModelList } from '@deity/falcon-data';
import { List, ListItem } from '@deity/falcon-ui';

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
    <List className="error">
      {errors.map(error => (
        <ListItem key={error.name} title={errorInsights(error)} my="md" color="error">
          {error.message}
        </ListItem>
      ))}
    </List>
  );
};
