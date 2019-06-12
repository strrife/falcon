import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REMOVE_ADDRESS = gql`
  mutation RemoveAddress($id: Int!) {
    removeCustomerAddress(id: $id)
  }
`;
export class RemoveAddressMutation extends Mutation {
  static defaultProps = {
    mutation: REMOVE_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
