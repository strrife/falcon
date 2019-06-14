import gql from 'graphql-tag';
import { Query } from '../Query';

export const GET_IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    customer {
      id
    }
  }
`;

export type IsAuthenticatedResponse = {
  customer: { id: number };
};

export class IsAuthenticatedQuery extends Query<IsAuthenticatedResponse> {
  static defaultProps = {
    query: GET_IS_AUTHENTICATED
  };

  static propTypes = {
    ...Query.propTypes
  };
}
