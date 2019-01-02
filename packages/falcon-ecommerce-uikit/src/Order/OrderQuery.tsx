import gql from 'graphql-tag';
import { Query } from '../Query/Query';
import { AddressData } from './../Address/AddressQuery';

export type Order = {
  entityId: number;
  incrementId: string;
  createdAt?: string;
  customerFirstname?: string;
  customerLastname?: string;
  status?: string; // list of possible statuses?
  grandTotal?: string;
  orderCurrencyCode?: string;
  items: OrderItem[];
  paymentMethodName: string;
  billingAddress: AddressData;
  shippingDescription: string;
  shippingAddress: AddressData;
};

export type OrderItem = {
  itemId: number;
  sku: string;
  name: string;
  price: number;
};

export const GET_ORDER = gql`
  query Order($id: Int!) {
    order(id: $id) {
      entityId
      incrementId
      createdAt
      customerFirstname
      customerLastname
      status
      grandTotal
      orderCurrencyCode
      items {
        itemId
        sku
        name
      }
      paymentMethodName
      billingAddress {
        company
        firstname
        lastname
        street
        city
        postcode
        countryId
        telephone
      }
      shippingDescription
      shippingAddress {
        company
        firstname
        lastname
        street
        city
        postcode
        countryId
        telephone
      }
    }
  }
`;

export class GetOrderQuery extends Query<Order> {
  static defaultProps = {
    query: GET_ORDER
  };
}

export const GET_LAST_ORDER = gql`
  query LastOrder {
    lastOrder {
      incrementId
      items {
        itemId
        name
      }
    }
  }
`;

export class LastOrderQuery extends Query<Order> {
  static defaultProps = {
    query: GET_LAST_ORDER
  };
}
