import React from 'react';
import { BackendConfigQuery } from './../BackendConfig';
import { Omit } from './../types';

type LocaleContextType = {
  locale: string;
  localeFallback: string;
  currency: string;
};

const LocaleContext = React.createContext<LocaleContextType>({
  locale: 'en',
  localeFallback: 'en',
  currency: 'EUR'
});

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
    }) => {
      // TODO: get locale fallback from i18n config?
      const localeFallback = 'en';

      return (
        <LocaleContext.Provider value={{ locale, localeFallback, currency, ...props }}>
          {children}
        </LocaleContext.Provider>
      );
    }}
  </BackendConfigQuery>
);

export type PriceFormatOptions = { locale?: string } & Omit<Intl.NumberFormatOptions, 'style'>;
export function priceFormatterFactory(localeCodes: string[], currency: string) {
  // Price Formatter based on Intl api
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
  return (value: number, options?: PriceFormatOptions) =>
    new Intl.NumberFormat([options && options.locale, ...localeCodes].filter(x => x), {
      currency,
      ...(options || {}),
      style: 'currency'
    }).format(value);
}

export type DateTimeFormatOptions = { locale?: string } & Intl.DateTimeFormatOptions;
export function dateTimeFormatterFactory(localeCodes: string[]) {
  // DateTime Formatter based on Intl api
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
  return (value: number | string | Date, options?: DateTimeFormatOptions) =>
    new Intl.DateTimeFormat([options.locale, ...localeCodes].filter(x => x), {
      ...options
    }).format(new Date(value));
}

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
