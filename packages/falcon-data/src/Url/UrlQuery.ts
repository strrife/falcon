import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from '../Query/Query';

export const GET_URL = gql`
  query Url($path: String!) {
    url(path: $path) {
      type
      redirect
      id
      path
    }
  }
`;

export type ResourceMeta = {
  type: string;
  redirect: boolean;
  id: string;
  path: string;
};

export type UrlQueryVariables = {
  path: string;
};
export type UrlQueryResponse = {
  url: ResourceMeta;
};

export class UrlQuery extends Query<UrlQueryResponse, UrlQueryVariables> {
  static defaultProps = {
    query: GET_URL
  };

  static propTypes = {
    ...Query.propTypes,
    path: PropTypes.string.isRequired
  };
}
