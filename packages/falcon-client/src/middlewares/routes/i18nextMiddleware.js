import gql from 'graphql-tag';
import i18nFactory from '../../i18n/i18nServerFactory';

const GET_LOCALES = gql`
  query GetLocales {
    backendConfig {
      locales
      activeLocale
    }
  }
`;

/**
 * @typedef {Object} Options
 * @property {string} lng language
 * @property {string[]} ns namespaces to load
 * @property {string} fallbackLng fallback language
 * @property {string[]} whitelist languages whitelist
 * @property {Object} resources Initial internationalization resources
 */

/**
 * i18next instance server side factory
 * @param {Options} options options
 * @returns {Promise<import("./index").KoaMiddleware>} Koa middleware
 */
export default async options => {
  const i18next = await i18nFactory({ ...options });

  return async (ctx, next) => {
    const { client } = ctx.state;

    const { data } = await client.query({ query: GET_LOCALES });
    await i18next.changeLanguage(data.backendConfig.activeLocale);

    ctx.i18next = i18next;

    return next();
  };
};
