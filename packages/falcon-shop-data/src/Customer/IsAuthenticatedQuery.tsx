import gql from 'graphql-tag';
import { Customer } from '@deity/falcon-shop-extension';
import { Query } from '../Query';

export const GET_IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    customer {
      id
    }
  }
`;

export type IsAuthenticatedResponse = {
  customer: Pick<Customer, 'id'>;
};

export class IsAuthenticatedQuery extends Query<IsAuthenticatedResponse> {
  static defaultProps = {
    query: GET_IS_AUTHENTICATED
  };

  static propTypes = {
    ...Query.propTypes
  };
}
