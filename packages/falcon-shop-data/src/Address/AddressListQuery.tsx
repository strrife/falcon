import gql from 'graphql-tag';
import { Address } from '@deity/falcon-shop-extension';
import { Query } from '../Query';

export type AddressListResponse = {
  addresses: {
    items: Address[];
  };
};

export const GET_ADDRESS_LIST = gql`
  query Addresses {
    addresses {
      items {
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
  }
`;

export class AddressListQuery extends Query<AddressListResponse> {
  static defaultProps = {
    query: GET_ADDRESS_LIST
  };
}
