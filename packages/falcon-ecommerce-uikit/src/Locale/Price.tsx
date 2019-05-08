import React from 'react';
import { themed, Text } from '@deity/falcon-ui';
import { Locale } from './LocaleContext';

const PriceInnerDom: React.SFC<any> = ({ value, currency, locale, ...rest }) => (
  <Locale>
    {({ priceFormat }) => (
      <Text {...rest}>
        {priceFormat(value, {
          ...(currency ? { currency } : {}),
          ...(locale ? { locale } : {})
        })}
      </Text>
    )}
  </Locale>
);

export const Price = themed({
  tag: PriceInnerDom,
  defaultProps: {
    ellipsis: false
  },
  defaultTheme: {
    price: {
      display: 'block',
      m: 'none',
      css: {
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      variants: {
        old: {
          css: {
            textDecorationStyle: 'solid',
            textDecorationLine: 'line-through'
          }
        },
        special: {
          fontWeight: 'bold',
          css: {
            color: 'red'
          }
        }
      }
    }
  }
});
