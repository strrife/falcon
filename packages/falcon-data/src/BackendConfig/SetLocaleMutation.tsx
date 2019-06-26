import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SET_LOCALE = gql`
  mutation SetLocale($locale: String!) {
    setLocale(locale: $locale) {
      activeLocale
    }
  }
`;

export type SetLocaleResponse = {
  setLocale: {
    activeLocale: string;
  };
};

export type SetLocaleVariables = {
  locale: string;
};

export class SetLocaleMutation extends Mutation<SetLocaleResponse, SetLocaleVariables> {
  static defaultProps = {
    mutation: SET_LOCALE,
    refetchQueries: ['BackendConfig']
  };
}
