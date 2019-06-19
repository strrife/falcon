import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Customer, EditCustomerInput } from '@deity/falcon-shop-extension';
import { InputArg } from '../types';

export const EDIT_CUSTOMER = gql`
  mutation EditCustomer($input: CustomerInput!) {
    editCustomer(input: $input) {
      id
    }
  }
`;

export type EditCustomerResponse = {
  editCustomer: Pick<Customer, 'id'>;
};

export class EditCustomerMutation extends Mutation<EditCustomerResponse, InputArg<EditCustomerInput>> {
  static defaultProps = {
    mutation: EDIT_CUSTOMER,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'CustomerWithAddresses']
  };
}
