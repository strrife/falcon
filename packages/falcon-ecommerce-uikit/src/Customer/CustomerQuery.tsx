import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_CUSTOMER = gql`
  query Customer {
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;

export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export type CustomerQueryData = {
  customer: Customer;
};

export class CustomerQuery extends Query<CustomerQueryData> {
  static defaultProps = {
    query: GET_CUSTOMER
  };
  static propTypes = {
    ...Query.propTypes
  };
}

export const GET_CUSTOMER_WITH_ADDRESSES = gql`
  query CustomerWithAddresses {
    customer {
      id
      firstname
      lastname
      email
      defaultBilling
      defaultShipping
      addresses {
        id
        firstname
        lastname
        city
        postcode
        countryId
        defaultBilling
        defaultShipping
        region
        regionId
        street
        telephone
      }
    }
  }
`;

export type CustomerWithAddress = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  addresses: {
    id: number;
    firstname: string;
    lastname: string;
    city: string;
    postcode: string;
    countryId: string;
    defaultBilling: boolean;
    defaultShipping: boolean;
    region: string;
    regionId: number;
    street: string;
    telephone: string;
  };
};

export class CustomerWithAddressesQuery extends Query<CustomerWithAddress> {
  static defaultProps = {
    query: GET_CUSTOMER_WITH_ADDRESSES
  };
}
