import React from 'react';
import { NetworkStatus } from 'apollo-client';
import { Query as ApolloQuery, OperationVariables, QueryProps, QueryResult } from 'react-apollo';
import { I18n, TranslationFunction } from 'react-i18next';
import { Loader } from './Loader';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export class Query<TData = any, TVariables = OperationVariables, TTranslations = {}> extends React.Component<
  Omit<QueryProps<TData, TVariables>, 'children'> & {
    children: (result: TData & { translations: TTranslations }) => React.ReactNode;
  } & {
    fetchMore?: (data: TData, fetchMore: QueryResult<TData, TVariables>['fetchMore']) => any;
    getTranslations?: (t: TranslationFunction, data: TData) => TTranslations;
    translationsNamespaces?: string[];
  }
> {
  render() {
    const { children, getTranslations, fetchMore, ...restProps } = this.props;

    return (
      <ApolloQuery {...restProps}>
        {({ networkStatus, error, data, loading, fetchMore: apolloFetchMore }) => {
          if (error) return `Error!: ${error}`;

          if (networkStatus === NetworkStatus.loading || loading) {
            return <Loader />;
          }

          const props = {
            ...(data as any),
            networkStatus,
            fetchMore: fetchMore ? () => fetchMore(data!, apolloFetchMore) : undefined
          };

          if (getTranslations) {
            return (
              <I18n ns={this.props.translationsNamespaces}>
                {t => children({ ...props, translations: getTranslations(t, data!) })}
              </I18n>
            );
          }

          return children(props);
        }}
      </ApolloQuery>
    );
  }
}
