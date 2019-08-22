import React from 'react';
import { Select, Option } from '@deity/falcon-ui';
import { Country } from '@deity/falcon-shop-extension';

export type CountryPickerProps = {
  id?: string;
  name?: string;
  items: Country[];
  value: string;
};

export const CountryPicker: React.SFC<CountryPickerProps> = props => {
  const { items, value, ...restProps } = props;

  return (
    <Select value={value} {...restProps}>
      {items.map(x => (
        <Option key={x.localName} value={x.code}>
          {x.localName}
        </Option>
      ))}
    </Select>
  );
};
