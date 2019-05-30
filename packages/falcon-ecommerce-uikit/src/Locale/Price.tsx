import React from 'react';
import PropTypes from 'prop-types';
import { themed, Text } from '@deity/falcon-ui';
import { Locale, PriceFormatOptions } from './LocaleContext';

export type PriceProps = {
  value: number;
  /** passing formatting options may not use memoized formatter, so the performance penalty could be paid */
  formatOptions?: PriceFormatOptions;
};
const PriceInnerDom: React.SFC<PriceProps> = ({ value, formatOptions, children, ...rest }) => (
  <Locale>
    {({ priceFormat }) => (
      <Text m="lg" {...rest}>
        {priceFormat(value, formatOptions)}
      </Text>
    )}
  </Locale>
);
PriceInnerDom.propTypes = {
  value: PropTypes.number.isRequired
};

export const Price = themed({
  tag: PriceInnerDom,
  defaultProps: {
    ellipsis: false,
    formatOptions: undefined
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
