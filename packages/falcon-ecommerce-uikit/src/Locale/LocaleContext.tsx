import React from 'react';
import { BackendConfigQuery } from '../BackendConfig';
import { Omit } from '../types';

export type LocaleContextType = {
  locale: string;
  localeFallback: string;
  currency: string;
  priceFormat: ReturnType<typeof priceFormatFactory>;
};

export type PriceFormatOptions = { locale?: string } & Omit<Intl.NumberFormatOptions, 'style'>;

const LocaleContext = React.createContext<LocaleContextType>({} as any);

export type LocaleProviderProps = {
  currency?: string;
  priceFormatOptions?: PriceFormatOptions;
};
export const LocaleProvider: React.SFC<LocaleProviderProps> = ({ children, priceFormatOptions = {}, ...props }) => (
  <BackendConfigQuery>
    {({ backendConfig }) => {
      const { activeLocale, shop } = backendConfig;

      const locale = activeLocale || 'en';
      const localeFallback = 'en';
      const currency = props.currency || shop.activeCurrency || 'EUR';
      const priceFormat = priceFormatFactory([priceFormatOptions.locale, locale, localeFallback], {
        currency,
        ...priceFormatOptions
      });

      return (
        <LocaleContext.Provider
          value={{
            locale,
            localeFallback,
            currency,
            priceFormat
          }}
        >
          {children}
        </LocaleContext.Provider>
      );
    }}
  </BackendConfigQuery>
);

export type LocaleProps = { children: (props: LocaleRenderProps) => any };
export type LocaleRenderProps = {
  locale: string;
  currency: string;
  priceFormat: ReturnType<typeof priceFormatFactory>;
  dateTimeFormat: (value: number | string | Date, options?: DateTimeFormatOptions) => string;
};
export const Locale: React.SFC<LocaleProps> = ({ children }) => (
  <LocaleContext.Consumer>
    {({ locale, localeFallback, currency, priceFormat }) =>
      children({
        locale,
        currency,
        priceFormat,
        dateTimeFormat: dateTimeFormatterFactory([locale, localeFallback])
      })
    }
  </LocaleContext.Consumer>
);

/**
 * Price Format function factory based on Intl api
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @param {string[]} localeCodes localization codes
 * @param {PriceFormatOptions} opt formatting options
 * @returns {ReturnType<typeof priceFormatFactory>} price formatter
 */
export function priceFormatFactory(localeCodes: string[], opt: PriceFormatOptions) {
  const getPriceFormatter = (locales: string[], numberFormatOptions: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locales.filter(x => x), { ...numberFormatOptions, style: 'currency' });

  const memoizedFormatter = getPriceFormatter([opt.locale, ...localeCodes], opt);

  /**
   * Price Format (memoized)
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   * @param {number} value value to format
   * @returns {string} formatted value
   */
  function priceFormat(value: number): string;
  /**
   * Price Format (not memoized, because of custom options, so the performance penalty could be paid)
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   * @param {number} value value to format
   * @param {PriceFormatOptions} overrides `LocaleProvider.priceFormatOptions` options overrides
   * @returns {string} formatted value
   */
  function priceFormat(value: number, overrides: PriceFormatOptions): string;
  function priceFormat(value: number, overrides?: PriceFormatOptions): string {
    return overrides
      ? getPriceFormatter([overrides.locale, opt.locale, ...localeCodes], { ...opt, ...overrides }).format(value)
      : memoizedFormatter.format(value);
  }

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
