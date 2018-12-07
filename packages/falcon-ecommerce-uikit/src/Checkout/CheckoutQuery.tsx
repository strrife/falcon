import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export type Country = {
  englishName: string;
  localName: string;
  code: string;
};

export type CountriesData = {
  items: Country[];
};

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      items {
        englishName
        localName
        code
      }
    }
  }
`;

export class CountriesQuery extends Query<CountriesData> {
  static defaultProps = {
    query: GET_COUNTRIES
  };
}

export type OrderItem = {
  itemId: number;
  name: string;
};

export type Order = {
  incrementId: string;
  items: OrderItem[];
};

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
