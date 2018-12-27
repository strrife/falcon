import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, themed, DefaultThemeProps } from '@deity/falcon-ui';
import { AddressData } from './AddressQuery';
import { toGridTemplate } from './../helpers';

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
      {street && street.map(x => <Text key={x}>{x}</Text>)}
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

export const AddressFormLayoutArea = {
  company: 'company',
  firstName: 'firstName',
  lastname: 'lastname',
  telephone: 'telephone',
  street: 'street',
  postcode: 'postcode',
  city: 'city',
  country: 'country'
};
export const addressFormLayout = {
  formLayout: {
    my: 'lg',
    display: 'grid',
    gridColumnGap: { xs: 'sm', md: 'xxl' },
    gridRowGap: { xs: 'sm' },
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'],
        [AddressFormLayoutArea.company],
        [AddressFormLayoutArea.firstName],
        [AddressFormLayoutArea.lastname],
        [AddressFormLayoutArea.telephone],
        [AddressFormLayoutArea.street],
        [AddressFormLayoutArea.postcode],
        [AddressFormLayoutArea.city],
        [AddressFormLayoutArea.country]

      ]),
      md: toGridTemplate([
        ['1fr', '1fr'],
        [AddressFormLayoutArea.company, AddressFormLayoutArea.street],
        [AddressFormLayoutArea.firstName, AddressFormLayoutArea.postcode],
        [AddressFormLayoutArea.lastname, AddressFormLayoutArea.city],
        [AddressFormLayoutArea.telephone, AddressFormLayoutArea.country]
      ])
    }
  }
};
