import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AddAddressInput, Address } from '@deity/falcon-shop-extension';

export const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddAddressInput!) {
    addAddress(input: $input) {
      id
    }
  }
`;

export type AddAddressVariables = {
  input: AddAddressInput;
};

export type AddAddressResponse = {
  addAddress: Pick<Address, 'id'>;
};

export class AddAddressMutation extends Mutation<AddAddressResponse, AddAddressVariables> {
  static defaultProps = {
    mutation: ADD_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
