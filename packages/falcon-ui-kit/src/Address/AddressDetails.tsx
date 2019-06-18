import React from 'react';
import { Box, Text, DefaultThemeProps } from '@deity/falcon-ui';
import { Address } from '@deity/falcon-shop-extension';

export const addressToString = (address: Address) =>
  [
    address.company,
    `${address.firstname} ${address.lastname}`,
    address.street && `${address.street.join(' ')}`,
    `${address.postcode} ${address.city}, ${address.countryId}`
  ]
    .filter(x => x)
    .join(', ');

export const addressDetailsTheme: DefaultThemeProps = {
  addressDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'secondaryText'
  }
};

export const AddressDetails: React.SFC<Address> = props => {
  const { company, firstname, lastname, street, postcode, city, countryId, telephone } = props;

  return (
    <Box defaultTheme={addressDetailsTheme}>
      {company && <Text fontWeight="bold" color="secondaryText">{`${company}`}</Text>}
      <Text fontWeight="bold" color="secondaryText" mb="xs">{`${firstname} ${lastname}`}</Text>
      {street && street.map(x => <Text key={x}>{x}</Text>)}
      <Text>{`${postcode} ${city}, ${countryId}`}</Text>
      {telephone && <Text>{telephone}</Text>}
    </Box>
  );
};
