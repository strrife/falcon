import React from 'react';
import { ApolloError } from 'apollo-client';

export type ErrorProps = ApolloError;
export const Error: React.SFC<ErrorProps> = ({ networkError, graphQLErrors, ...main }) => {
  if (graphQLErrors) {
    return (
      <div className="error">
        {graphQLErrors.length === 1 ? (
          <p key={name} title={`[${graphQLErrors[0].extensions && graphQLErrors[0].extensions.code}] ${name}`}>
            {graphQLErrors[0].message}
          </p>
        ) : (
          <ul>
            {graphQLErrors.map(({ name, message, extensions }) => {
              return (
                <li key={name} title={`[${extensions && extensions.code}] ${name}`}>
                  {message}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  if (networkError) {
    return (
      <div className="error">
        <p title={networkError.name}>{networkError.message}</p>
      </div>
    );
  }

  return (
    <div className="error">
      <p title={main.name}>{main.message}</p>
    </div>
  );
};
