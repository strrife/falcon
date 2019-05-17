import React from 'react';
import { themed, Text } from '@deity/falcon-ui';
import { Locale, DateTimeFormatOptions } from './LocaleContext';

type DateFormatProps = {
  value: string;
  locale?: string;
  options?: DateTimeFormatOptions;
};

const DateFormatInnerDOM: React.SFC<DateFormatProps> = ({ value, locale, options, ...rest }) => (
  <Locale>{({ dateTimeFormat }) => <Text {...rest}>{dateTimeFormat(value, { ...options, locale })}</Text>}</Locale>
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
