import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Customer, EditCustomerInput } from '@deity/falcon-shop-extension';

export const EDIT_CUSTOMER = gql`
  mutation EditCustomer($input: CustomerInput!) {
    editCustomer(input: $input) {
      id
    }
  }
`;

export type EditCustomerVariables = {
  input: EditCustomerInput;
};

export type EditCustomerResponse = {
  editCustomer: Pick<Customer, 'id'>;
};

export class EditCustomerMutation extends Mutation<EditCustomerResponse, EditCustomerVariables> {
  static defaultProps = {
    mutation: EDIT_CUSTOMER,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'CustomerWithAddresses']
  };
}
