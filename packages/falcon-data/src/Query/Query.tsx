import React from 'react';
import PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { Query as ApolloQuery, QueryComponentOptions } from '@apollo/react-components';
import { useQuery as useApolloQuery, QueryHookOptions } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import { Loader } from './Loader';
import { OperationError } from './OperationError';

export type ApolloFetchMore<TData, TVariables> = QueryResult<TData, TVariables>['fetchMore'];
export type FetchMore<TData, TVariables> = (data: TData, fetchMore: ApolloFetchMore<TData, TVariables>) => any;

export type QueryRenderProps<TData = any, TVariables = OperationVariables> = {
  fetchMore: (() => any) | ApolloFetchMore<TData, TVariables>;
} & Omit<QueryResult<TData, TVariables>, 'fetchMore'>;

export type QueryProps<TData, TVariables> = {
  fetchMore?: FetchMore<TData, TVariables>;
  passLoading?: boolean;
  passError?: boolean;
  children?: (renderProps: QueryRenderProps<TData, TVariables>) => any;
} & Omit<QueryComponentOptions<TData, TVariables>, 'children'>;

export class Query<TData = any, TVariables = OperationVariables> extends React.Component<
  QueryProps<TData, TVariables>
> {
  static propTypes = {
    ...ApolloQuery.propTypes,
    passLoading: PropTypes.bool,
    passError: PropTypes.bool
  };

  render() {
    const { children, fetchMore, passLoading, passError, ...restProps } = this.props;

    return (
      <ApolloQuery {...restProps}>
        {(result: QueryResult<TData, TVariables>) => {
          const { networkStatus, error, data, fetchMore: apolloFetchMore } = result;

          if (!passError && error) {
            return <OperationError {...error} />;
          }

          const loading =
            networkStatus === NetworkStatus.loading || (networkStatus !== NetworkStatus.fetchMore && result.loading);
          if (!passLoading && loading) {
            return <Loader />;
          }

          return children({
            ...result,
            data: data || ({} as TData),
            fetchMore: fetchMore ? () => fetchMore(data!, result.fetchMore) : apolloFetchMore
          });
        }}
      </ApolloQuery>
    );
  }
}

export type QueryOptions<TData, TVariables> = QueryHookOptions<TData, TVariables> & {
  fetchMore?: FetchMore<TData, TVariables>;
};
export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryOptions<TData, TVariables>
) {
  const { fetchMore, ...restOptions } = options || ({} as QueryOptions<TData, TVariables>);
  const result = useApolloQuery<TData, TVariables>(query, restOptions);
  const { data, fetchMore: apolloFetchMore } = result;

  return {
    ...result,
    fetchMore: fetchMore ? () => fetchMore(data!, result.fetchMore) : apolloFetchMore
  };
}
