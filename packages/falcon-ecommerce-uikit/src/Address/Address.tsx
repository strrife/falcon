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
export const AddressDetails: React.SFC<AddressData> = props => {
  const { company, firstname, lastname, street, postcode, city, countryId, telephone } = props;

  return (
    <Box defaultTheme={addressDetailsTheme}>
      {company && <Text fontWeight="bold" color="secondaryText">{`${company}`}</Text>}
      <Text fontWeight="bold" color="secondaryText" mb="xs">{`${firstname} ${lastname}`}</Text>
      {street && street.map(x => <Text id={x}>{x}</Text>)}
      <Text>{`${postcode} ${city}, ${countryId}`}</Text>
      {telephone && <Text>{telephone}</Text>}
    </Box>
  );
};

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
