import React from 'react';
import { Box, H4 } from '@deity/falcon-ui';
import { ProductOptionRadio } from './ProductOptionRadio';

export type ProductOption = {
  id: string;
  attributeId: string;
  label?: string;
  productId: string;
  values: ProductOptionValue[];
};
export type ProductOptionValue = {
  inStock: string;
  label: string;
  valueIndex: string;
};

export type ProductOptionProps = {
  label?: string;
  name: string;
  values: ProductOptionValue[];
  disabled?: boolean;
  onChange: Function;
};
export const ProductOption: React.SFC<ProductOptionProps> = ({ label, name, values, disabled, onChange }) => (
  <Box mb="sm">
    {label && <H4 mb="sm">{label}</H4>}
    {values.map(value => (
      <ProductOptionRadio
        key={value.valueIndex}
        value={value.valueIndex}
        name={name}
        onChange={ev => onChange(ev)}
        disabled={disabled}
        icon={<div>{value.label}</div>}
      />
    ))}
  </Box>
);
