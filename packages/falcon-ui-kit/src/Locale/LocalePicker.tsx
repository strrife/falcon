import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';
import { LocaleItem } from '@deity/falcon-front-kit';

export type LocalePickerProps = {
  items: LocaleItem[];
  value: LocaleItem;
  onChange?: (x: LocaleItem) => any;
};

export const LocalePicker: React.SFC<LocalePickerProps> = ({ items, value, onChange }) => (
  <Dropdown onChange={onChange}>
    <DropdownLabel>{value.name}</DropdownLabel>
    <DropdownMenu variant="above">
      {items.map(x => (
        <DropdownMenuItem key={x.code} value={x}>
          {x.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

LocalePicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func
};
