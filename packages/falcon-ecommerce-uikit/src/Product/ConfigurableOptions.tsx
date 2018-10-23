import React from 'react';
import { FieldArray } from 'formik';
import { Box, Radio, H3 } from '@deity/falcon-ui';

const Option: React.SFC<{ option: any; disabled?: boolean; onChange: Function }> = ({ option, disabled, onChange }) => (
  <Box mb="md">
    <H3 mb="md">{option.label}</H3>
    {option.values.map((value: any) => (
      <Radio
        key={value.valueIndex}
        disabled={disabled}
        mr="sm"
        icon={<div>{value.label}</div>}
        size={55}
        onChange={ev => onChange(ev)}
        name={option.attributeId}
        value={value.valueIndex}
      />
    ))}
  </Box>
);

export const ProductOptions: React.SFC<{ options: any[]; onChange: Function }> = ({ options, onChange }) => (
  <Box>
    {options.map(option => (
      <Option key={option.id} option={option} onChange={onChange} />
    ))}
  </Box>
);
ProductOptions.defaultProps = {
  options: []
};
