import React from 'react';
import { Box, Radio, H4, Text } from '@deity/falcon-ui';

// todo: these should be mapped to proper hex values and probably moved outside this file (to configuration?)
const colorNamesToHex: { [key: string]: string } = {
  red: 'red',
  green: 'green',
  blue: 'blue',
  cyan: 'cyan',
  magenta: 'magenta',
  yellow: 'yellow',
  black: 'back',
  white: 'white',
  pink: 'pink',
  purple: 'purple',
  orange: 'orange'
};

type OptionData = {
  name: string;
  value: string;
  label: string;
};

type OptionPropTypes = {
  option: OptionData;
  onChange: Function;
  disabled?: boolean;
};

const ColorSwatch: React.SFC<OptionPropTypes> = ({ option, onChange, disabled }) => (
  <Radio
    variant="colorSwatch"
    disabled={disabled}
    mr="xs"
    icon={<div />}
    onChange={ev => onChange(ev)}
    name={option.name}
    value={option.value}
    css={{
      cursor: 'pointer',
      backgroundColor: colorNamesToHex[option.label.toLowerCase()] || option.label.toLowerCase(),
      borderRadius: '100%',
      height: 40,
      width: 40
    }}
  />
);

const DefaultItem: React.SFC<OptionPropTypes> = ({ option, onChange, disabled }) => (
  <Radio
    disabled={disabled}
    mr="xs"
    icon={<div>{option.label}</div>}
    onChange={ev => onChange(ev)}
    name={option.name}
    value={option.value}
    css={{
      cursor: 'pointer',
      height: 40,
      width: 40
    }}
  />
);

const componentsByOptionType: { [key: string]: any } = {
  color: ColorSwatch
};

const Option: React.SFC<{ option: any; disabled?: boolean; onChange: Function }> = ({ option, disabled, onChange }) => {
  // this is not the best way to pick the type but it's safer to use label than id as atm we use it only for color swatches
  const Component: any = componentsByOptionType[option.label.toLowerCase()] || DefaultItem;
  return (
    <Box mb="sm">
      <H4 mb="sm">{option.label}</H4>
      {option.values.map((value: any) => (
        <Component
          key={value.valueIndex}
          disabled={disabled}
          onChange={(ev: any) => onChange(ev)}
          option={{
            name: option.attributeId,
            value: value.valueIndex,
            label: value.label
          }}
        />
      ))}
    </Box>
  );
};

export const ProductConfigurableOptions: React.SFC<{ options: any[]; error?: string; onChange: Function }> = ({
  options,
  error,
  onChange
}) => (
  <Box>
    {options.map(option => (
      <Option key={option.id} option={option} onChange={onChange} />
    ))}
    {!!error && <Text color="error">{error}</Text>}
  </Box>
);
ProductConfigurableOptions.defaultProps = {
  options: []
};
