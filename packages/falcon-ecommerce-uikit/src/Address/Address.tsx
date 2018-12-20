import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, themed, DefaultThemeProps } from '@deity/falcon-ui';
import { AddressData } from './AddressQuery';

export const addressDetailsTheme: DefaultThemeProps = {
  addressDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'secondaryText'
  }
};
export const AddressDetails: React.SFC<AddressData> = props => (
  <Box defaultTheme={addressDetailsTheme}>
    <Text fontWeight="bold" color="secondaryText" mb="xs">{`${props.firstname} ${props.lastname}`}</Text>
    {props.street && (
      <Box>
        {props.street.map(x => (
          <Text>{x}</Text>
        ))}
      </Box>
    )}
    <Text>{`${props.postcode} ${props.city}`}</Text>
    {/* <Text>{`${props.regionId} ${props.region}`}</Text> */}
    <Text>{props.countryId}</Text>
    <Text>{props.telephone}</Text>
  </Box>
);

export const AddressCardLayout = themed({
  tag: 'li',
  defaultTheme: {
    addressCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
});
export const AddressCard: React.SFC<{ address: AddressData }> = ({ address }) => (
  <AddressCardLayout>
    <AddressDetails {...address} />
  </AddressCardLayout>
);

export const AddressesListLayout = themed({
  tag: 'ul',
  defaultTheme: {
    addressesListLayout: {
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        md: 'repeat(2, 1fr)'
      },
      gridGap: 'md',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});
