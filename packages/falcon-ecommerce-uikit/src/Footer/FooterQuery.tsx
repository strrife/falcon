import gql from 'graphql-tag';
import { Query } from '../Query';
import { MenuItem } from '../Header';

const GET_FOOTER_DATA = gql`
  query FooterData {
    config @client {
      menus {
        footer {
          name
          children {
            name
            url
          }
        }
      }
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
    menus: {
      footer: MenuItem[];
    };
    languages: LanguageItem[];
  };
};

function getTranslations(t: reactI18Next.TranslationFunction) {
  return {
    newsletter: {
      title: t('newsletter.title'),
      message: t('newsletter.message'),
      subscribe: t('newsletter.subscribe'),
      emailPlaceholder: t('newsletter.emailPlaceholder'),
      consent: t('newsletter.consent')
    },
    copyright: t('copyright')
  };
}

export type FooterTranslations = ReturnType<typeof getTranslations>;

export class FooterQuery extends Query<FooterData, {}, FooterTranslations> {
  static defaultProps = {
    query: GET_FOOTER_DATA,
    getTranslations,
    translationsNamespaces: ['shop']
  };
}
