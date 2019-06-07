import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddAddressInput!) {
    addAddress(input: $input) {
      id
    }
  }
`;
export class AddAddressMutation extends Mutation {
  static defaultProps = {
    mutation: ADD_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
