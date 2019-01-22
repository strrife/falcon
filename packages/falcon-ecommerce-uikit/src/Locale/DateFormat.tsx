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
    {localeContext => {
      let localeCode = locale || localeContext.locale;
      localeCode = localeCode.replace('_', '-');
      localeCode = localeCode === 'cimode' ? 'en' : localeCode;

      return <Text {...rest}>{new Intl.DateTimeFormat(localeCode, options).format(new Date(value))}</Text>;
    }}
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
