import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Address, EditAddressInput } from '@deity/falcon-shop-extension';

export const EDIT_ADDRESS = gql`
  mutation EditAddress($input: EditAddressInput!) {
    editAddress(input: $input) {
      id
    }
  }
`;

export type EditAddressVariables = {
  input: EditAddressInput;
};

export type EditAddressResponse = {
  editAddress: Pick<Address, 'id'>;
};

export class EditAddressMutation extends Mutation<EditAddressResponse, EditAddressVariables> {
  static defaultProps = {
    mutation: EDIT_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
