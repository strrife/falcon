import React from 'react';
import { Box, Text } from '@deity/falcon-ui';
import { ProductOption } from './ProductOption';

export type ProductOptionListProps = {
  items: ProductOption[];
  error?: string;
  onChange: Function;
};
export const ProductOptionList: React.SFC<ProductOptionListProps> = ({ items: options, error, onChange }) => (
  <Box>
    {options.map(({ id, label, attributeId, values }) => (
      <ProductOption key={id} label={label} name={attributeId} values={values} onChange={onChange} />
    ))}
    {!!error && <Text color="error">{error}</Text>}
  </Box>
);
ProductOptionList.defaultProps = {
  items: []
};
