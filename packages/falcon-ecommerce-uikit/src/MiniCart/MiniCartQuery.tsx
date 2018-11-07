import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_MINI_CART = gql`
  query MiniCart {
    miniCart @client {
      open
    }
    cart {
      itemsQty
      quoteCurrency
      items {
        itemId
        sku
        qty
        name
        price
        thumbnailUrl
      }
    }
  }
`;

export type MiniCartData = {
  miniCart: {
    open: boolean;
  };
  cart: {
    itemsQty: number;
    quoteCurrency: string;
    items: any[];
  };
};

function getTranslations(t: reactI18Next.TranslationFunction) {
  return {
    title: t('miniCart.title'),
    cta: t('miniCart.cta'),
    continue: t('miniCart.continue'),
    empty: t('miniCart.empty')
  };
}

export type MiniCartTranslations = ReturnType<typeof getTranslations>;

export class MiniCartQuery extends Query<MiniCartData, {}, MiniCartTranslations> {
  static defaultProps = {
    query: GET_MINI_CART,
    getTranslations,
    translationsNamespaces: ['shop']
  };
}
