import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Customer, EditCustomerInput } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

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

export class EditCustomerMutation extends Mutation<EditCustomerResponse, OperationInput<EditCustomerInput>> {
  static defaultProps = {
    mutation: EDIT_CUSTOMER,
    refetchQueries: ['Customer', 'CustomerWithAddresses']
  };
}
