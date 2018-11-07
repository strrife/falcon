import React from 'react';
import { themed, Text } from '@deity/falcon-ui';
import { LocaleContext } from './LocaleContext';

type DateFormatProps = {
  value: string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

const DateFormatInnerDOM: React.SFC<DateFormatProps> = ({ value, locale, options, ...rest }) => (
  <LocaleContext.Consumer>
    {({ locale: defaultLocale }) => (
      <Text {...rest}>{new Intl.DateTimeFormat(locale || defaultLocale, options).format(new Date(value))}</Text>
    )}
  </LocaleContext.Consumer>
);

export const DateFormat = themed({
  tag: DateFormatInnerDOM,

  defaultTheme: {
    price: {
      display: 'block',
      m: 'none'
    }
  }
});
