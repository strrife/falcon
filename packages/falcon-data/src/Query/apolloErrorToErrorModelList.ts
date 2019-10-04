import { ApolloError } from 'apollo-client';
import { codes } from '@deity/falcon-errors';

export type ErrorModel = {
  name: string;
  message: string;
  code?: string;
  /** path to property (on operation input or operation output) on which error occurs */
  path?: any;
};

export const apolloErrorToErrorModelList = (error: ApolloError): ErrorModel[] => {
  const { networkError, graphQLErrors } = error;

  if (networkError) {
    return [
      {
        name: networkError.name,
        message: networkError.message
      }
    ];
  }

  if (graphQLErrors) {
    return graphQLErrors.reduce<ErrorModel[]>((result, { name, message, extensions = {} }) => {
      if (extensions.code === codes.BAD_USER_INPUT && extensions.exception) {
        const userInputErrors = Object.keys(extensions.exception).map(x => ({
          name,
          message: extensions.exception[x],
          code: extensions.code,
          path: x
        }));

        return [...result, ...userInputErrors];
      }

      return [...result, { name, message, code: extensions.code }];
    }, []);
  }

  return [
    {
      name: error.name,
      message: error.message
    }
  ];
};
