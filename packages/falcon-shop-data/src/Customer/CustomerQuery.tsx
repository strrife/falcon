import gql from 'graphql-tag';
import { Customer } from '@deity/falcon-shop-extension';
import { Query } from '../Query';

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

export type CustomerQueryResponse = {
  customer: Pick<Customer, 'id' | 'firstname' | 'lastname' | 'email' | 'websiteId'>;
};

export class CustomerQuery extends Query<CustomerQueryResponse> {
  static defaultProps = {
    query: GET_CUSTOMER
  };

  static propTypes = {
    ...Query.propTypes
  };
}
