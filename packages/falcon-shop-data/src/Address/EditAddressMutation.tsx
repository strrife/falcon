import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const EDIT_ADDRESS = gql`
  mutation EditAddress($input: EditAddressInput!) {
    editAddress(input: $input) {
      id
    }
  }
`;
export class EditAddressMutation extends Mutation {
  static defaultProps = {
    mutation: EDIT_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['AddressList']
  };
}
