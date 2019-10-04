import React from 'react';
import { ApolloError } from 'apollo-client';
import { ErrorModel, apolloErrorToErrorModelList } from './apolloErrorToErrorModelList';

export type ErrorProps = ApolloError;
export const Error: React.SFC<ErrorProps> = props => {
  const errors = apolloErrorToErrorModelList(props);

  const errorInsight = ({ message, ...rest }: ErrorModel) => {
    if (process.env.NODE_ENV !== 'production') {
      return JSON.stringify({ ...rest }, null, 2);
    }
    return '';
  };

  return (
    <div className="error">
      {errors.length <= 1 ? (
        <p title={errorInsight(errors[0])}>{errors[0].message}</p>
      ) : (
        <ul>
          {errors.map(error => {
            return (
              <li key={error.name} title={errorInsight(error)}>
                {error.message}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
