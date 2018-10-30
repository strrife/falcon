import React from 'react';
import { Query as ApolloQuery, OperationVariables, QueryProps, QueryResult, ObservableQueryFields } from 'react-apollo';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { I18n, TranslationFunction } from 'react-i18next';
import { Loader } from './Loader';

export class Query<TData = any, TVariables = OperationVariables, TTranslations = {}> extends React.Component<
  QueryProps<TData, TVariables> & {
    children: (result: TData | TData & { translations: TTranslations } | undefined) => React.ReactNode;
  } & {
    fetchMore?: (data: TData, fetchMore: QueryResult<TData, TVariables>['fetchMore']) => any;
    getTranslations?: (t: TranslationFunction, data: TData) => TTranslations;
    translationsNamespaces?: string[];
    handleErrors?: boolean;
  }
> {
  getErrorCode(error: ApolloError | undefined): string | undefined {
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
    const { children, getTranslations, fetchMore, handleErrors, ...restProps } = this.props;

    return (
      <ApolloQuery {...restProps}>
        {({ networkStatus, error, data, fetchMore: apolloFetchMore }) => {
          if (error) {
            const errorCode = this.getErrorCode(error);

            return (
              <p>
                {`Error!: ${errorCode}`}
                <br /> {`${error}`}
              </p>
            );
          }

          if (networkStatus === NetworkStatus.loading) {
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
