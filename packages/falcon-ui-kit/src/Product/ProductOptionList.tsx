import React from 'react';
import { Box } from '@deity/falcon-ui';
import {
  ConfigurableProductOptionRadioGroupField,
  ConfigurableProductOption
} from './ConfigurableProductOptionRadioGroupField';

export type ProductOptionListProps = {
  gridArea: string;
  name: string;
  items: ConfigurableProductOption[];
  disabled?: boolean;
};
export const ProductOptionList: React.SFC<ProductOptionListProps> = props => {
  return (
    <Box gridArea={props.gridArea}>
      {props.items.map(({ label, attributeId, values }) => (
        <ConfigurableProductOptionRadioGroupField
          key={attributeId}
          label={label}
          name={`${props.name}.${attributeId}`}
          values={values}
          disabled={props.disabled}
        />
      ))}
    </Box>
  );
};
ProductOptionList.defaultProps = {
  items: []
};
