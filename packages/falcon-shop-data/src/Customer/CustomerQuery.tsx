import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { CustomerQueryResponse } from './types';

export const GET_CUSTOMER = gql`
  query Customer {
    customer {
      id
      firstname
      lastname
      email
      websiteId
    }
  }
`;

export class CustomerQuery extends Query<CustomerQueryResponse> {
  static defaultProps = {
    query: GET_CUSTOMER
  };

  static propTypes = {
    ...Query.propTypes
  };
}
