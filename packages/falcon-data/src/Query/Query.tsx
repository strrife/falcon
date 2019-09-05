import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery, OperationVariables, QueryProps as ApolloQueryProps, QueryResult } from 'react-apollo';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { Loader } from './Loader';
import { Error } from './Error';

export type ApolloFetchMore<TData, TVariables> = QueryResult<TData, TVariables>['fetchMore'];
export type FetchMore<TData, TVariables> = (data: TData, fetchMore: ApolloFetchMore<TData, TVariables>) => any;

export type QueryRenderProps<TData = any> = TData & {
  loading: boolean;
  error?: ApolloError;
  networkStatus: NetworkStatus;
  fetchMore: (() => any) | undefined;
};

export type QueryProps<TData, TVariables> = Omit<ApolloQueryProps<TData, TVariables>, 'children'> & {
  children: (result: QueryRenderProps<TData>) => React.ReactNode;
  fetchMore?: FetchMore<TData, TVariables>;
  passLoading?: boolean;
  passError?: boolean;
  variables?: TVariables | any;
};

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
        {({ networkStatus, error, data, loading, fetchMore: apolloFetchMore }: QueryResult<TData, TVariables>) => {
          if (!passError && error) {
            return <Error error={error} />;
          }

          loading = networkStatus === NetworkStatus.loading || (networkStatus !== NetworkStatus.fetchMore && loading);
          if (!passLoading && loading) {
            return <Loader />;
          }

          return children({
            ...data!,
            loading,
            error,
            networkStatus,
            fetchMore: fetchMore ? () => fetchMore(data!, apolloFetchMore) : undefined
          });
        }}
      </ApolloQuery>
    );
  }
}
