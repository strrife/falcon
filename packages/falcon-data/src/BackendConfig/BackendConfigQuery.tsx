import gql from 'graphql-tag';
import { Query } from '../Query';

export const GET_BACKEND_CONFIG = gql`
  query BackendConfig {
    backendConfig {
      locales
      activeLocale
    }
  }
`;

export type BackendConfig = {
  locales: string[];
  activeLocale: string;
};

export type BackendConfigQueryResponse = {
  backendConfig: BackendConfig;
};

export class BackendConfigQuery extends Query<BackendConfigQueryResponse> {
  static defaultProps = {
    query: GET_BACKEND_CONFIG
  };
}
