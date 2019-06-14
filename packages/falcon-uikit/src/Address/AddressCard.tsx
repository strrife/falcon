import React from 'react';
import { themed, ListItem } from '@deity/falcon-ui';
import { Address } from '@deity/falcon-shop-extension';
import { AddressDetails } from './AddressDetails';

export const AddressCardLayout = themed({
  tag: ListItem,
  defaultTheme: {
    addressCardLayout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
});

export const AddressCard: React.SFC<{ address: Address }> = ({ address }) => (
  <AddressCardLayout>
    <AddressDetails {...address} />
  </AddressCardLayout>
);
