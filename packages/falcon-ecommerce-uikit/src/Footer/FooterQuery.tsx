import gql from 'graphql-tag';
import { Query } from '../Query';
import { MenuItem } from '../Menu';

const GET_FOOTER_DATA = gql`
  query FooterData {
    config @client {
      languages {
        name
        code
        active
      }
    }
  }
`;

export type LanguageItem = {
  name: string;
  code: string;
  active: boolean;
};

export type FooterData = {
  config: {
    languages: LanguageItem[];
  };
};

export class FooterQuery extends Query<FooterData, {}> {
  static defaultProps = {
    query: GET_FOOTER_DATA
  };
}
