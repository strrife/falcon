import React from 'react';
import { Query as ApolloQuery, OperationVariables, QueryProps, QueryResult } from 'react-apollo';
import { NetworkStatus, ApolloError } from 'apollo-client';
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
  getErrorCode(error?: ApolloError): string | undefined {
    if (error) {
      const { graphQLErrors } = error;
      if (Array.isArray(graphQLErrors) && graphQLErrors.length > 0) {
        const { extensions = {} } = graphQLErrors[0];
        const { code } = extensions;

        return code;
      }
    }

    return undefined;
  }

  render() {
    const { children, getTranslations, fetchMore, ...restProps } = this.props;

    return (
      <ApolloQuery {...restProps}>
        {({ networkStatus, error, data, loading, fetchMore: apolloFetchMore }) => {
          if (error) {
            const errorCode = this.getErrorCode(error);
            // TODO: check errorPolicy and if === 'all' then pass thru render props all extracted/formated errors with errorcodes instead of inline error message
            return (
              <p>
                {`Error!: ${errorCode}`}
                <br /> {`${error}`}
              </p>
            );
          }

          if (networkStatus === NetworkStatus.loading || (networkStatus !== NetworkStatus.fetchMore && loading)) {
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
