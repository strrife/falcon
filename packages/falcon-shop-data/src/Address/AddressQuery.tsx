import gql from 'graphql-tag';
import { Address } from '@deity/falcon-shop-extension';
import { Query } from '../Query';

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

export type AddressResponse = {
  address: Pick<
    Address,
    | 'id'
    | 'firstname'
    | 'lastname'
    | 'telephone'
    | 'street'
    | 'city'
    | 'postcode'
    | 'region'
    | 'regionId'
    | 'countryId'
    | 'company'
    | 'defaultBilling'
    | 'defaultShipping'
  >[];
};
export class AddressQuery extends Query<AddressResponse> {
  static defaultProps = {
    query: GET_ADDRESS
  };
}
