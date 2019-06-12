import gql from 'graphql-tag';
import { Customer } from '@deity/falcon-shop-extension';
import { Query } from '../Query/Query';

const GET_MINI_ACCOUNT = gql`
  query MiniAccount {
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;

export type MiniAccountData = {
  customer: Customer;
};

export class MiniAccountQuery extends Query<MiniAccountData> {
  static defaultProps = {
    query: GET_MINI_ACCOUNT
  };
}
