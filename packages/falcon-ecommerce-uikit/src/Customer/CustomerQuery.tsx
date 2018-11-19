import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_CUSTOMER = gql`
  query Customer {
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;

export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export type CustomerQueryData = {
  customer: Customer;
};

export class CustomerQuery extends Query<CustomerQueryData> {
  static defaultProps = {
    query: GET_CUSTOMER
  };
}
