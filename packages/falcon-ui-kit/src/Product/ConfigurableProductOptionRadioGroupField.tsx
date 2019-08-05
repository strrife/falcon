import React from 'react';
import { Box, H4 } from '@deity/falcon-ui';
import { Field, requiredValidator } from '@deity/falcon-front-kit';
import { FormFieldError } from '../Forms';
import { ProductOptionRadio } from './ProductOptionRadio';

export type ConfigurableProductOption = {
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

export type ConfigurableProductOptionRadioGroupFieldProps = {
  label?: string;
  name: string;
  values: ProductOptionValue[];
  disabled?: boolean;
};
export const ConfigurableProductOptionRadioGroupField: React.SFC<ConfigurableProductOptionRadioGroupFieldProps> = ({
  label,
  name,
  values,
  disabled
}) => (
  <Field name={name} label={label} validate={[requiredValidator]}>
    {({ field, error }) => {
      return (
        <Box mb="sm">
          {label && <H4 mb="sm">{label}</H4>}
          {values.map(value => (
            <ProductOptionRadio
              {...field}
              key={value.valueIndex}
              value={value.valueIndex}
              checked={value.valueIndex === field.value}
              disabled={disabled}
              icon={<div>{value.label}</div>}
            />
          ))}
          <FormFieldError>{field.invalid ? error : null}</FormFieldError>
        </Box>
      );
    }}
  </Field>
);
