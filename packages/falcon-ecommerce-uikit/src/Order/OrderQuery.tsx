import gql from 'graphql-tag';
import { Address } from '@deity/falcon-shop-extension';
import { Query } from '../Query/Query';

export type Order = {
  entityId: number;
  incrementId: string;
  createdAt?: string;
  customerFirstname?: string;
  customerLastname?: string;
  status?: string; // list of possible statuses?
  subtotal: number;
  grandTotal: number;
  shippingAmount: number;
  orderCurrencyCode?: string;
  items: OrderItem[];
  paymentMethodName: string;
  billingAddress: Address;
  shippingDescription: string;
  shippingAddress: Address;
};

export type OrderItem = {
  itemId: number;
  sku: string;
  name: string;
  rowTotalInclTax: number;
  thumbnailUrl: string;
  qty: number;
  link: string;
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
      subtotal
      shippingAmount
      grandTotal
      orderCurrencyCode
      shippingDescription
      paymentMethodName
      items {
        itemId
        sku
        name
        rowTotalInclTax
        qty
        thumbnailUrl
        link
      }
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
