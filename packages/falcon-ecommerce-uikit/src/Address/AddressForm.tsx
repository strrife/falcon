import React from 'react';
import { toGridTemplate } from './../helpers';

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
