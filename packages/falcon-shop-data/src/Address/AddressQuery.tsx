import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Address } from '@deity/falcon-shop-extension';

export const GET_ADDRESS = gql`
  query Address($id: Int!) {
    address(id: $id) {
      id
      firstname
      lastname
      telephone
      street
      city
      postcode
      region
      regionId
      countryId
      company
      defaultBilling
      defaultShipping
    }
  }
`;
export class AddressQuery extends Query<Address> {
  static defaultProps = {
    query: GET_ADDRESS
  };
}
