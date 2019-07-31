import React from 'react';
import { Box, Radio, H4, Text } from '@deity/falcon-ui';

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
      <Radio
        key={value.valueIndex}
        value={value.valueIndex}
        name={name}
        onChange={ev => onChange(ev)}
        disabled={disabled}
        icon={<div>{value.label}</div>}
        mr="xs"
        css={{
          cursor: 'pointer',
          height: 55,
          width: 55
        }}
      />
    ))}
  </Box>
);

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
