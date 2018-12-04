import React from 'react';
import PropTypes from 'prop-types';
import { Text, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';

const renderAddress = address => (
  <Text>
    {address.firstname}, {address.lastname}, {address.street}, {address.city}, {address.telephone}
  </Text>
);

const renderAddressById = (items, id) => {
  const addr = items.find(item => item.id === id);
  if (addr) {
    return renderAddress(addr);
  }
  return <Text>Other</Text>;
};

const AddressPicker = ({ addresses, selectedAddressId, onChange }) => (
  <Dropdown key={selectedAddressId || 'none'} onChange={onChange}>
    <DropdownLabel>{renderAddressById(addresses, selectedAddressId)}</DropdownLabel>
    <DropdownMenu>
      {addresses.map(item => (
        <DropdownMenuItem value={item.id} key={item.id}>
          {renderAddress(item)}
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem value={-1}>Other</DropdownMenuItem>
    </DropdownMenu>
  </Dropdown>
);

AddressPicker.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({})),
  selectedAddressId: PropTypes.number,
  onChange: PropTypes.func
};

export default AddressPicker;
