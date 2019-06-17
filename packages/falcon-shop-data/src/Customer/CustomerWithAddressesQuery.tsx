import gql from 'graphql-tag';
import { Query } from '@deity/falcon-data';
import { Customer } from '@deity/falcon-shop-extension';

export const GET_CUSTOMER_WITH_ADDRESSES = gql`
  query CustomerWithAddresses {
    customer {
      id
      firstname
      lastname
      email
      addresses {
        id
        company
        firstname
        lastname
        street
        postcode
        city
        countryId
        defaultBilling
        defaultShipping
        region
        regionId
        telephone
      }
    }
  }
`;

export class CustomerWithAddressesQuery extends Query<Customer> {
  static defaultProps = {
    query: GET_CUSTOMER_WITH_ADDRESSES
  };
}
