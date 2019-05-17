import React from 'react';
import PropTypes from 'prop-types';
import { themed, Text, ThemedComponents } from '@deity/falcon-ui';
import { Locale } from './LocaleContext';

export type PriceProps = {
  value: number;
  currency?: string;
  locale?: string;
};

const PriceInnerDom: React.SFC<PriceProps> = ({ value, currency, locale, children, ...rest }) => (
  <Locale>
    {({ priceFormat }) => (
      <Text m="lg" {...rest}>
        {priceFormat(value, { currency, locale })}
      </Text>
    )}
  </Locale>
);
PriceInnerDom.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string,
  locale: PropTypes.string
};

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
