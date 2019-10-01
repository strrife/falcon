import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@deity/falcon-i18n';
import { Box, Text, ThemedComponentProps } from '@deity/falcon-ui';
import { Locale } from '@deity/falcon-front-kit';

export type ProductTierPricesProps = {
  items: {
    qty: number;
    value: number;
    discount: number;
  }[];
};
export const ProductTierPrices: React.SFC<ProductTierPricesProps & ThemedComponentProps> = ({
  items: tierPrices,
  ...rest
}) => {
  if (!Array.isArray(tierPrices) || !tierPrices.length) {
    return null;
  }

  return (
    <Box {...(rest as any)}>
      <Locale>
        {({ priceFormat }) =>
          tierPrices.map(x => (
            <Text key={x.qty}>
              <T id="product.tierPriceDescription" qty={x.qty} price={priceFormat(x.value)} discount={x.discount} />
            </Text>
          ))
        }
      </Locale>
    </Box>
  );
};
ProductTierPrices.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      qty: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired
    })
  )
};