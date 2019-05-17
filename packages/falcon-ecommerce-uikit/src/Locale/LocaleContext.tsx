import React from 'react';
import { BackendConfigQuery } from '../BackendConfig';
import { Omit } from '../types';

type LocaleContextType = {
  locale: string;
  localeFallback: string;
  currency: string;
};

const localeDefaults = {
  locale: 'en',
  // TODO: get locale fallback from i18n config?
  localeFallback: 'en',
  currency: 'EUR'
};
const LocaleContext = React.createContext<LocaleContextType>(localeDefaults);

export type LocaleProviderProps = {
  currency?: string;
};
export const LocaleProvider: React.SFC<LocaleProviderProps> = ({ children, ...props }) => (
  <BackendConfigQuery>
    {({
      backendConfig: {
        activeLocale: locale,
        shop: { activeCurrency: currency }
      }
    }) => (
      <LocaleContext.Provider value={{ ...localeDefaults, locale, currency, ...props }}>
        {children}
      </LocaleContext.Provider>
    )}
  </BackendConfigQuery>
);

export type LocaleRenderProps = {
  locale: string;
  currency: string;
  priceFormat: (value: number, options?: PriceFormatOptions) => string;
  dateTimeFormat: (value: number | string | Date, options?: DateTimeFormatOptions) => string;
};
export const Locale: React.SFC<{ children: (props: LocaleRenderProps) => any }> = ({ children }) => (
  <LocaleContext.Consumer>
    {({ locale, localeFallback, currency }) =>
      children({
        locale,
        currency,
        priceFormat: priceFormatterFactory([locale, localeFallback], currency),
        dateTimeFormat: dateTimeFormatterFactory([locale, localeFallback])
      })
    }
  </LocaleContext.Consumer>
);

export type PriceFormatOptions = { locale?: string } & Omit<Intl.NumberFormatOptions, 'style'>;
export function priceFormatterFactory(localeCodes: string[], currency: string) {
  /**
   * Price Formatter based on Intl api, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   * @param {number} value value to format
   * @param {PriceFormatOptions} options formatting options
   * @returns {string} formatted value
   */
  const priceFormat = (value: number, options: PriceFormatOptions = {}) => {
    const { currency: currencyOption, locale: localeOption, ...restOptions } = options;

    return new Intl.NumberFormat([localeOption, ...localeCodes].filter(x => x), {
      currency: currencyOption || currency,
      ...restOptions,
      style: 'currency'
    }).format(value);
  };

  return priceFormat;
}

export type DateTimeFormatOptions = { locale?: string } & Intl.DateTimeFormatOptions;
export function dateTimeFormatterFactory(localeCodes: string[]) {
  /**
   * DateTime Formatter based on Intl api, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {number | string | Date} value value to format
   * @param {PriceFormatOptions} options formatting options
   * @returns {string} formatted value
   */
  const dateTimeFormat = (value: number | string | Date, options: DateTimeFormatOptions = {}) => {
    const { locale: localeOption, ...restOptions } = options;

    return new Intl.DateTimeFormat([localeOption, ...localeCodes].filter(x => x), {
      ...restOptions
    }).format(new Date(value));
  };

  return dateTimeFormat;
}
