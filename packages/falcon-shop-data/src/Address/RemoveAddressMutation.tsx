import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REMOVE_ADDRESS = gql`
  mutation RemoveAddress($id: Int!) {
    removeAddress(id: $id)
  }
`;

export type RemoveAddressResponse = {
  removeAddress: boolean;
};

export type RemoveAddressVariables = {
  id: number;
};

export class RemoveAddressMutation extends Mutation<RemoveAddressResponse, RemoveAddressVariables> {
  static defaultProps = {
    mutation: REMOVE_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
